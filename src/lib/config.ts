export const INTRO_COPY = {
  eyebrow: "Luther Riley Enterprises — Brand Identity Review",
  headline: "Let's find your mark.",
  body: "These are 4 directions for the Luther Riley Enterprises logo. Don't overthink it — go with your gut. Rate each one, drop a quick note on what works or what's off, and pick your favorite. Your feedback shapes the final design — and the whole look of your brand.",
};

export const LOGOS = [
  { id: "option-1", label: "Option A", filename: "option-1.png" },
  { id: "option-2", label: "Option B", filename: "option-2.png" },
  { id: "option-3", label: "Option C", filename: "option-3.png" },
  { id: "option-4", label: "Option D", filename: "option-4.png" },
] as const;

export type LogoId = (typeof LOGOS)[number]["id"];

export const VIBE_TAGS = [
  { id: "regal-luxe", label: "Regal / Luxe" },
  { id: "modern-minimal", label: "Modern / Minimal" },
  { id: "bold-energetic", label: "Bold / Energetic" },
  { id: "premium-executive", label: "Premium / Executive" },
  { id: "athletic-dynamic", label: "Athletic / Dynamic" },
  { id: "timeless-classic", label: "Timeless / Classic" },
] as const;
