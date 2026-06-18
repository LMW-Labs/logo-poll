import { Suspense } from "react";
import PollForm from "@/components/PollForm";
import { INTRO_COPY } from "@/lib/config";
import HeroAnimation from "@/components/HeroAnimation";

export default function PollPage() {
  return (
    <main className="relative min-h-screen bg-brand-charcoal overflow-x-hidden">
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(232,98,42,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Hero section */}
      <header className="relative pt-16 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-[60px] bg-brand-orange/40" />
            <span className="text-brand-orange text-xs font-semibold tracking-[0.25em] uppercase">
              {INTRO_COPY.eyebrow}
            </span>
          </div>

          <HeroAnimation
            headline={INTRO_COPY.headline}
            body={INTRO_COPY.body}
          />
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />
      </div>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <Suspense>
          <PollForm />
        </Suspense>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-brand-gray/40 text-xs tracking-widest uppercase">
          Brand Identity Review &bull; Logo Poll
        </p>
      </footer>
    </main>
  );
}
