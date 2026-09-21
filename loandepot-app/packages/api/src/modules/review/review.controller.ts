import { inject, injectable } from "inversify";
import { BaseController } from "../../common/base.controller.js";
import { TYPES } from "../../types.js";
import { ILogger } from "../logger/logger.interface.js";
import { IReviewService } from "./review.service.interface.js";
import { IReview } from "@loandepot/types";
import { Response, Request } from "express";

@injectable()
export class ReviewController extends BaseController {
  constructor(
    @inject(TYPES.Logger) logger: ILogger,
    @inject(TYPES.ReviewService) private reviewService: IReviewService,
  ) {
    super(logger);
    this.bindRoutes([
      {
        path: "/reviews",
        func: this.getAllReviews,
        method: "get",
      },
    ]);
  }

  async getAllReviews(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.reviewService.getAllReviews();
      this.ok(res, result);
    } catch (error) {
      this.logger.error(
        "[ReviewController]: произошла непредвиденная ошибка",
        error,
      );
      this.error(res, 500, "Не удалось загрузить отзывы пользователей");
    }
  }
}
