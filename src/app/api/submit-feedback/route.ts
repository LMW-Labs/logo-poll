import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveSubmission } from "@/lib/store";

const RatingSchema = z.object({
  option_id: z.string(),
  stars: z.number().int().min(1).max(5).nullable(),
  comment: z.string().max(2000).optional().default(""),
});

const PayloadSchema = z.object({
  reviewer_name: z.string().max(200).optional().default(""),
  favorite_option: z.string().min(1),
  vibe_tags: z.array(z.string()).default([]),
  overall_comment: z.string().max(5000).optional().default(""),
  ratings: z.array(RatingSchema),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = PayloadSchema.parse(body);

    await saveSubmission({
      reviewer_name: data.reviewer_name,
      favorite_option: data.favorite_option,
      vibe_tags: data.vibe_tags,
      overall_comment: data.overall_comment,
      ratings: data.ratings.map((r) => ({
        option_id: r.option_id,
        stars: r.stars,
        comment: r.comment,
      })),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: err.errors[0].message },
        { status: 400 }
      );
    }
    console.error("submit-feedback error:", err);
    return NextResponse.json(
      { success: false, error: "Server error — please try again." },
      { status: 500 }
    );
  }
}
