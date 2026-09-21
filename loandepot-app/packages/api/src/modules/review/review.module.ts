import { ContainerModule } from "inversify";
import { IReviewRepository } from "./review.repository.interface.js";
import { TYPES } from "../../types.js";
import { ReviewRepository } from "./review.repository.js";
import { IReviewService } from "./review.service.interface.js";
import { ReviewService } from "./review.service.js";
import { ReviewController } from "./review.controller.js";

export const reviewModule = new ContainerModule((options) => {
  options
    .bind<IReviewRepository>(TYPES.ReviewRepository)
    .to(ReviewRepository)
    .inSingletonScope();
  options
    .bind<IReviewService>(TYPES.ReviewService)
    .to(ReviewService)
    .inSingletonScope();
  options
    .bind<ReviewController>(TYPES.ReviewController)
    .to(ReviewController)
    .inSingletonScope();
});
