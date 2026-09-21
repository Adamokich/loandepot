import { IReview } from "@loandepot/types";

export interface IReviewService {
  getAllReviews: () => Promise<IReview[]>;
}
