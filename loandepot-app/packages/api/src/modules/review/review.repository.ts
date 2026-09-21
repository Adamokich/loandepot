import { IReview } from "@loandepot/types";
import { IReviewRepository } from "./review.repository.interface.js";
import { ReviewModel } from "../../models/reviews.model.js";
import { injectable } from "inversify";

@injectable()
export class ReviewRepository implements IReviewRepository {
  findAllReviews(): Promise<IReview[]> {
    return ReviewModel.find({}).lean();
  }
}
