"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LOGOS, VIBE_TAGS } from "@/lib/config";
import type { LogoRating, FeedbackPayload } from "@/types";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StarRating({
  value,
  onChange,
  logoLabel,
}: {
  value: number | null;
  onChange: (v: number) => void;
  logoLabel: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="flex gap-2"
      role="group"
      aria-label={`Star rating for ${logoLabel}`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const active = hovered !== null ? star <= hovered : star <= (value ?? 0);
        return (
          <motion.button
            key={star}
            type="button"
            whileTap={{ scale: 1.4 }}
            whileHover={{ scale: 1.15 }}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`${star} star${star !== 1 ? "s" : ""}`}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded"
          >
            <motion.svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              animate={{
                scale: active ? 1 : 0.9,
                filter: active
                  ? "drop-shadow(0 0 6px rgba(232,98,42,0.7))"
                  : "none",
              }}
              transition={{ duration: 0.15 }}
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={active ? "#E8622A" : "transparent"}
                stroke={active ? "#E8622A" : "#8A8A8A"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>
        );
      })}
    </div>
  );
}

function LogoCard({
  logo,
  index,
  rating,
  isFavorite,
  onRatingChange,
  onCommentChange,
  onFavoriteSelect,
}: {
  logo: (typeof LOGOS)[number];
  index: number;
  rating: LogoRating;
  isFavorite: boolean;
  onRatingChange: (stars: number) => void;
  onCommentChange: (comment: string) => void;
  onFavoriteSelect: () => void;
}) {
  const [isDark, setIsDark] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`relative rounded-2xl border transition-all duration-500 ${
        isFavorite
          ? "border-brand-orange shadow-[0_0_40px_rgba(232,98,42,0.35)] bg-gradient-to-b from-[#241a15] to-[#1E1E1E]"
          : "border-white/10 bg-gradient-to-b from-[#202020] to-[#1A1A1A] hover:border-white/20"
      }`}
    >
      {/* Favorite glow ring */}
      <AnimatePresence>
        {isFavorite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(232,98,42,0.08) 0%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-brand-orange font-bold text-sm tracking-[0.15em] uppercase">
            {logo.label}
          </span>
          {isFavorite && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-brand-orange text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
            >
              Favorite
            </motion.span>
          )}
        </div>

        {/* Dark / Light toggle */}
        <button
          type="button"
          onClick={() => setIsDark(!isDark)}
          className="flex items-center gap-2 text-xs text-brand-gray hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 border border-white/10"
        >
          <span>{isDark ? "🌙" : "☀️"}</span>
          <span>{isDark ? "Dark bg" : "Light bg"}</span>
        </button>
      </div>

      {/* Logo display tile */}
      <div className="px-6">
        <motion.div
          animate={{
            backgroundColor: isDark ? "#111111" : "#F5F5F5",
          }}
          transition={{ duration: 0.4 }}
          className="relative rounded-xl overflow-hidden flex items-center justify-center"
          style={{ height: "220px" }}
        >
          {/* Subtle grid pattern */}
          <div
            className={`absolute inset-0 ${isDark ? "opacity-10" : "opacity-5"}`}
            style={{
              backgroundImage: `radial-gradient(circle, ${isDark ? "#555" : "#999"} 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <Image
            src={`/logos/${logo.filename}`}
            alt={`Luther Riley Enterprises ${logo.label} logo concept`}
            width={260}
            height={180}
            className="relative z-10 object-contain max-h-[180px] max-w-[260px]"
            priority={index < 2}
          />
        </motion.div>
      </div>

      {/* Ratings + Comment */}
      <div className="px-6 py-5 space-y-4">
        <div>
          <p className="text-xs text-brand-gray uppercase tracking-widest mb-3 font-medium">
            Your rating
          </p>
          <StarRating
            value={rating.stars}
            onChange={onRatingChange}
            logoLabel={logo.label}
          />
        </div>

        <div>
          <label
            htmlFor={`comment-${logo.id}`}
            className="text-xs text-brand-gray uppercase tracking-widest mb-2 block font-medium"
          >
            Quick note <span className="normal-case">(optional)</span>
          </label>
          <textarea
            id={`comment-${logo.id}`}
            value={rating.comment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="What works? What doesn't? Any gut reaction..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-brand-gray/50 resize-none focus:outline-none focus:border-brand-orange/50 focus:bg-white/8 transition-all"
          />
        </div>

        {/* Pick as favorite */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onFavoriteSelect}
          className={`w-full py-3 rounded-xl border text-sm font-semibold tracking-wide transition-all duration-300 ${
            isFavorite
              ? "bg-brand-orange border-brand-orange text-white shadow-[0_4px_20px_rgba(232,98,42,0.4)]"
              : "bg-transparent border-white/15 text-brand-gray hover:border-brand-orange/50 hover:text-white"
          }`}
        >
          {isFavorite ? "★ This is my favorite" : "Pick as favorite"}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Form
// ---------------------------------------------------------------------------

export default function PollForm() {
  const [reviewerName, setReviewerName] = useState("Dr. Riley");
  const [ratings, setRatings] = useState<LogoRating[]>(
    LOGOS.map((l) => ({ option_id: l.id, stars: null, comment: "" }))
  );
  const [favorite, setFavorite] = useState<string>("");
  const [vibeTags, setVibeTags] = useState<string[]>([]);
  const [overallComment, setOverallComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const ratedCount = ratings.filter((r) => r.stars !== null).length;

  const updateRating = useCallback((optionId: string, stars: number) => {
    setRatings((prev) =>
      prev.map((r) => (r.option_id === optionId ? { ...r, stars } : r))
    );
  }, []);

  const updateComment = useCallback((optionId: string, comment: string) => {
    setRatings((prev) =>
      prev.map((r) => (r.option_id === optionId ? { ...r, comment } : r))
    );
  }, []);

  const toggleVibeTag = (tagId: string) => {
    setVibeTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!favorite) errs.favorite = "Please pick your overall favorite.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const payload: FeedbackPayload = {
        reviewer_name: reviewerName,
        favorite_option: favorite,
        vibe_tags: vibeTags,
        overall_comment: overallComment,
        ratings,
      };
      const res = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? "Unknown error");
      setSubmitted(true);
    } catch (err) {
      setErrors({
        submit:
          err instanceof Error
            ? err.message
            : "Something went wrong — please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-brand-orange/15 border border-brand-orange/40 flex items-center justify-center mb-8"
        >
          <svg
            className="w-9 h-9 text-brand-orange"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Thanks, Coach.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-brand-gray text-lg max-w-md"
        >
          Your input shapes the final mark. I&apos;ll use your feedback to build
          a brand identity that feels exactly like you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-brand-orange/60 text-sm tracking-widest uppercase font-medium"
        >
          #8Rings1Mindset
        </motion.div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Reviewer name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12 max-w-sm"
      >
        <label
          htmlFor="reviewer-name"
          className="block text-xs text-brand-gray uppercase tracking-widest mb-2 font-medium"
        >
          Your name
        </label>
        <input
          id="reviewer-name"
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-brand-gray/50 focus:outline-none focus:border-brand-orange/50 transition-all"
        />
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 flex items-center gap-4"
      >
        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-orange rounded-full"
            animate={{ width: `${(ratedCount / LOGOS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs text-brand-gray whitespace-nowrap">
          {ratedCount} / {LOGOS.length} rated
        </span>
      </motion.div>

      {/* Logo cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {LOGOS.map((logo, i) => {
          const rating = ratings.find((r) => r.option_id === logo.id)!;
          return (
            <LogoCard
              key={logo.id}
              logo={logo}
              index={i}
              rating={rating}
              isFavorite={favorite === logo.id}
              onRatingChange={(stars) => updateRating(logo.id, stars)}
              onCommentChange={(comment) => updateComment(logo.id, comment)}
              onFavoriteSelect={() => {
                setFavorite(logo.id);
                setErrors((prev) => ({ ...prev, favorite: "" }));
              }}
            />
          );
        })}
      </div>

      {/* Favorite error */}
      <AnimatePresence>
        {errors.favorite && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-sm mb-6 flex items-center gap-2"
          >
            <span>⚠</span> {errors.favorite}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Vibe tags */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h3 className="text-lg font-bold text-white mb-2">
          Which feeling fits your brand best?
        </h3>
        <p className="text-brand-gray text-sm mb-6">
          Select all that apply — this helps shape your entire brand system, not
          just the logo.
        </p>
        <div className="flex flex-wrap gap-3">
          {VIBE_TAGS.map((tag) => {
            const active = vibeTags.includes(tag.id);
            return (
              <motion.button
                key={tag.id}
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => toggleVibeTag(tag.id)}
                className={`px-5 py-2.5 rounded-full border text-sm font-medium tracking-wide transition-all duration-200 ${
                  active
                    ? "bg-brand-orange border-brand-orange text-white shadow-[0_2px_16px_rgba(232,98,42,0.35)]"
                    : "bg-white/5 border-white/15 text-brand-gray hover:border-brand-orange/40 hover:text-white"
                }`}
              >
                {tag.label}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Overall comments */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <label
          htmlFor="overall-comment"
          className="block text-lg font-bold text-white mb-2"
        >
          Anything else?
        </label>
        <p className="text-brand-gray text-sm mb-4">
          Colors you love or hate, what feels like you, anything you&apos;d
          change — the more honest the better.
        </p>
        <textarea
          id="overall-comment"
          value={overallComment}
          onChange={(e) => setOverallComment(e.target.value)}
          placeholder="What feels like the championship brand you've built? What doesn't?"
          rows={5}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-brand-gray/40 resize-none focus:outline-none focus:border-brand-orange/50 focus:bg-white/8 transition-all text-sm leading-relaxed"
        />
      </motion.div>

      {/* Submit error */}
      <AnimatePresence>
        {errors.submit && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-sm mb-4 flex items-center gap-2"
          >
            <span>⚠</span> {errors.submit}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Low rating warning */}
      <AnimatePresence>
        {ratedCount < LOGOS.length && ratedCount > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-brand-gray/70 text-xs mb-4"
          >
            Rating all 4 gives you the clearest data — but you can submit with
            what you have.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Sticky submit */}
      <div className="sticky bottom-4 z-40 mt-2">
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={submitting ? {} : { scale: 1.02 }}
          whileTap={submitting ? {} : { scale: 0.98 }}
          className="w-full py-4 rounded-xl bg-brand-orange text-white font-bold text-base tracking-wide shadow-[0_4px_30px_rgba(232,98,42,0.5)] hover:bg-brand-orange-light disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
        >
          {submitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit Feedback</span>
          )}
        </motion.button>
      </div>
    </form>
  );
}
