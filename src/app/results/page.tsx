import { getAllSubmissions } from "@/lib/store";
import { LOGOS, VIBE_TAGS } from "@/lib/config";

interface SearchParams {
  password?: string;
}

function PasswordForm({ error }: { error?: boolean }) {
  return (
    <main className="min-h-screen bg-brand-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-2">Results</h1>
        <p className={`text-sm mb-8 ${error ? "text-red-400" : "text-brand-gray"}`}>
          {error ? "Incorrect password." : "Enter the results password to continue."}
        </p>
        <form method="GET">
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-brand-gray/40 focus:outline-none focus:border-brand-orange/50 mb-4 ${
              error ? "border-red-500/40" : "border-white/15"
            }`}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange-light transition-colors"
          >
            {error ? "Try Again" : "View Results"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const password = searchParams?.password ?? "";
  const correctPassword = process.env.RESULTS_PASSWORD ?? "";

  if (!password) return <PasswordForm />;
  if (password !== correctPassword) return <PasswordForm error />;

  // Authenticated — fetch all submissions
  const submissions = await getAllSubmissions();

  if (submissions.length === 0) {
    return (
      <main className="min-h-screen bg-brand-charcoal px-6 py-16 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Results</h1>
        <p className="text-brand-gray">No submissions yet.</p>
      </main>
    );
  }

  // Compute aggregates in memory
  const favoriteCount: Record<string, number> = {};
  const starsByOption: Record<string, number[]> = {};
  const vibeCount: Record<string, number> = {};

  for (const s of submissions) {
    favoriteCount[s.favorite_option] = (favoriteCount[s.favorite_option] ?? 0) + 1;
    for (const tag of s.vibe_tags ?? []) {
      vibeCount[tag] = (vibeCount[tag] ?? 0) + 1;
    }
    for (const r of s.ratings ?? []) {
      if (r.stars) {
        starsByOption[r.option_id] ??= [];
        starsByOption[r.option_id].push(r.stars);
      }
    }
  }

  const avgStars = (optId: string) => {
    const arr = starsByOption[optId];
    if (!arr?.length) return null;
    return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
  };

  return (
    <main className="min-h-screen bg-brand-charcoal text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-white">Feedback Results</h1>
            <p className="text-brand-gray mt-1">
              {submissions.length} submission{submissions.length !== 1 ? "s" : ""}
            </p>
          </div>
          <span className="text-brand-orange text-sm font-semibold tracking-widest uppercase">
            Luther Riley Enterprises
          </span>
        </div>

        {/* Average stars per logo */}
        <section className="mb-12">
          <h2 className="text-xs text-brand-gray uppercase tracking-widest font-semibold mb-6">
            Average Rating
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LOGOS.map((logo) => {
              const avg = avgStars(logo.id);
              const favVotes = favoriteCount[logo.id] ?? 0;
              return (
                <div
                  key={logo.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
                >
                  <p className="text-brand-orange font-bold text-xs tracking-widest uppercase mb-3">
                    {logo.label}
                  </p>
                  <p className="text-4xl font-black text-white mb-1">{avg ?? "—"}</p>
                  <p className="text-brand-gray text-xs mb-3">/ 5 stars</p>
                  <p className="text-xs text-brand-gray">
                    <span className="text-white font-semibold">{favVotes}</span>{" "}
                    favorite vote{favVotes !== 1 ? "s" : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Vibe tags */}
        <section className="mb-12">
          <h2 className="text-xs text-brand-gray uppercase tracking-widest font-semibold mb-6">
            Brand Feeling — Vibe Tags
          </h2>
          <div className="flex flex-wrap gap-3">
            {VIBE_TAGS.map((tag) => {
              const count = vibeCount[tag.id] ?? 0;
              return (
                <div
                  key={tag.id}
                  className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 ${
                    count > 0
                      ? "border-brand-orange/50 bg-brand-orange/10 text-white"
                      : "border-white/10 text-brand-gray"
                  }`}
                >
                  <span>{tag.label}</span>
                  <span
                    className={`font-bold text-xs ${
                      count > 0 ? "text-brand-orange" : "text-brand-gray/50"
                    }`}
                  >
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* All submissions */}
        <section>
          <h2 className="text-xs text-brand-gray uppercase tracking-widest font-semibold mb-6">
            All Submissions
          </h2>
          <div className="space-y-8">
            {submissions.map((s) => (
              <div
                key={s.id}
                className="bg-white/3 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-white">
                      {s.reviewer_name || "Anonymous"}
                    </p>
                    <p className="text-brand-gray text-xs mt-0.5">
                      {new Date(s.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className="bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-bold px-3 py-1 rounded-full">
                    Favorite:{" "}
                    {LOGOS.find((l) => l.id === s.favorite_option)?.label ??
                      s.favorite_option}
                  </span>
                </div>

                {/* Per-logo ratings */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {LOGOS.map((logo) => {
                    const r = s.ratings?.find((rt) => rt.option_id === logo.id);
                    return (
                      <div key={logo.id} className="bg-white/5 rounded-xl p-3">
                        <p className="text-brand-orange text-xs font-bold mb-1">
                          {logo.label}
                        </p>
                        <p className="text-white text-sm font-semibold">
                          {r?.stars
                            ? `${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}`
                            : "—"}
                        </p>
                        {r?.comment && (
                          <p className="text-brand-gray text-xs mt-1 leading-relaxed">
                            {r.comment}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Vibe tags */}
                {s.vibe_tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {s.vibe_tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-brand-gray"
                      >
                        {VIBE_TAGS.find((t) => t.id === tag)?.label ?? tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Overall comment */}
                {s.overall_comment && (
                  <blockquote className="border-l-2 border-brand-orange/40 pl-4 text-brand-gray text-sm leading-relaxed italic">
                    {s.overall_comment}
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
