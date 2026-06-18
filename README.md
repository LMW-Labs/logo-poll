# Luther Riley Enterprises — Logo Poll

A temporary, single-purpose logo feedback app for Dr. Riley's brand identity review.
**Data layer: Upstash Redis** (free, no credit card required).

## Setup (5 steps)

### 1. Logo images
Already in `public/logos/` as `option-1.png` through `option-4.png`.
To swap logos, replace those files — no code changes needed.
To change labels, edit `src/lib/config.ts` → `LOGOS` array.

### 2. Create a free Upstash Redis database
1. Go to https://console.upstash.com — sign up free (no card).
2. Click **Create Database** → choose any region → free tier.
3. Copy the **REST URL** and **REST Token** from the database details page.

> **Alternative:** If you're on Vercel, you can use Vercel KV instead.
> Go to your Vercel project → Storage → Create KV Store.
> Vercel auto-adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` to your env.
> The app detects these automatically — no code change needed.

### 3. Environment variables
```bash
cp .env.local.example .env.local
```
Fill in:
- `UPSTASH_REDIS_REST_URL` — from Upstash dashboard
- `UPSTASH_REDIS_REST_TOKEN` — from Upstash dashboard
- `RESULTS_PASSWORD` — any password you choose

### 4. Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

### 5. Deploy to Vercel
```bash
npx vercel
```
Add the 3 env vars in Vercel dashboard (Settings → Environment Variables), then:
```bash
npx vercel --prod
```

## Pages
- `/` — The poll (public)
- `/results?password=YOUR_PASSWORD` — Results dashboard (password protected, your eyes only)

## Customise copy
Edit `src/lib/config.ts`:
- `INTRO_COPY` — headline and body text at the top of the poll
- `LOGOS` — option labels and filenames
- `VIBE_TAGS` — the aesthetic feeling checkboxes

## Cleanup after the poll
Once Dr. Riley has responded, delete the Upstash database from the console.
The Vercel project can be deleted or left — it costs nothing on the hobby tier.
