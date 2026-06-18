"use client";

import { motion } from "framer-motion";

export default function HeroAnimation({
  headline,
  body,
}: {
  headline: string;
  body: string;
}) {
  return (
    <>
      {/* Championship ring decoration */}
      <div className="relative mb-10 w-fit">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Outer pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.0, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-brand-orange/40"
            style={{ margin: "-12px" }}
          />
          {/* Inner ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-2 border-brand-orange/20 flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle, rgba(232,98,42,0.08) 0%, transparent 70%)",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-2xl font-black text-brand-orange"
              style={{ fontStyle: "italic" }}
            >
              8
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6"
      >
        {headline.split(" ").map((word, i) =>
          word === "mark." ? (
            <span key={i} className="gradient-text">
              {word}
            </span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </motion.h1>

      {/* Body */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        className="text-brand-gray text-lg leading-relaxed max-w-xl"
      >
        {body}
      </motion.p>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap gap-6 mt-8"
      >
        {[
          { number: "4", label: "Concepts" },
          { number: "8", label: "Championships" },
          { number: "1", label: "Mindset" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-brand-orange">
              {stat.number}
            </span>
            <span className="text-brand-gray text-sm uppercase tracking-widest font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </>
  );
}
