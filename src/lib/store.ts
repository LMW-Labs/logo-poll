/**
 * Persistence layer — single module so swapping providers only touches this file.
 *
 * Active provider: Upstash Redis via @upstash/redis
 *
 * Auto-select logic:
 *   • If KV_REST_API_URL + KV_REST_API_TOKEN are present (Vercel KV), those are used.
 *   • Otherwise falls back to UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Upstash direct).
 * Both are the same Upstash REST API under the hood — no code change needed between the two.
 *
 * Free Upstash database (no card): https://console.upstash.com
 */

import { Redis } from "@upstash/redis";

function getRedis(): Redis {
  // Vercel KV uses KV_* env vars; Upstash direct uses UPSTASH_* — same API, same client.
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Missing Redis env vars. Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN " +
        "(or KV_REST_API_URL + KV_REST_API_TOKEN for Vercel KV)."
    );
  }
  return new Redis({ url, token });
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface StoredSubmission {
  id: string;
  reviewer_name: string;
  favorite_option: string;
  vibe_tags: string[];
  overall_comment: string;
  ratings: Array<{
    option_id: string;
    stars: number | null;
    comment: string;
  }>;
  created_at: string;
}

const INDEX_KEY = "poll:submissions";

function submissionKey(id: string) {
  return `poll:submission:${id}`;
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------

export async function saveSubmission(
  payload: Omit<StoredSubmission, "id" | "created_at">
): Promise<string> {
  const redis = getRedis();
  const id = crypto.randomUUID();
  const record: StoredSubmission = {
    ...payload,
    id,
    created_at: new Date().toISOString(),
  };

  // Store full record + push id to index list
  await Promise.all([
    redis.set(submissionKey(id), JSON.stringify(record)),
    redis.lpush(INDEX_KEY, id),
  ]);

  return id;
}

// ---------------------------------------------------------------------------
// Read (server-only — used by /results)
// ---------------------------------------------------------------------------

export async function getAllSubmissions(): Promise<StoredSubmission[]> {
  const redis = getRedis();

  const ids = await redis.lrange<string>(INDEX_KEY, 0, -1);
  if (!ids.length) return [];

  const keys = ids.map(submissionKey);
  const records = await Promise.all(keys.map((k) => redis.get<string>(k)));

  return records
    .filter((r): r is string => r !== null)
    .map((r) => {
      try {
        // Upstash may return already-parsed JSON or a raw string
        return typeof r === "string" ? (JSON.parse(r) as StoredSubmission) : (r as unknown as StoredSubmission);
      } catch {
        return null;
      }
    })
    .filter((r): r is StoredSubmission => r !== null);
}
