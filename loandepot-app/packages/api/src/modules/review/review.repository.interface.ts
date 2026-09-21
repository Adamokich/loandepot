import { IReview } from "@loandepot/types";

export interface IReviewRepository {
  findAllReviews: () => Promise<IReview[]>;
}
