import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Logo Review — Luther Riley Enterprises",
  description:
    "Rate and review the Luther Riley Enterprises brand mark concepts.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-charcoal min-h-screen">{children}</body>
    </html>
  );
}
