export interface LogoRating {
  option_id: string;
  stars: number | null;
  comment: string;
}

export interface FeedbackPayload {
  reviewer_name: string;
  favorite_option: string;
  vibe_tags: string[];
  overall_comment: string;
  ratings: LogoRating[];
}

export interface SubmitResponse {
  success: boolean;
  error?: string;
}
