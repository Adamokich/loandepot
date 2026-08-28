import { IReview } from "@loandepot/types";
import { IReviewService } from "./review.service.interface.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import { IReviewRepository } from "./review.repository.interface.js";

@injectable()
export class ReviewService implements IReviewService {
  constructor(
    @inject(TYPES.ReviewRepository) private reviewRepository: IReviewRepository,
  ) {}

  public async getAllReviews(): Promise<IReview[]> {
    return this.reviewRepository.findAllReviews();
  }
}
