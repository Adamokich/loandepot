import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { App } from "./app.js";
import {
  Container,
  ContainerModule,
  ContainerModuleLoadOptions,
} from "inversify";
import { ILogger } from "./modules/logger/logger.interface.js";
import { TYPES } from "./types.js";
import { LoggerService } from "./modules/logger/logger.service.js";
import { IModuleRepository } from "./modules/module/module.repository.interface.js";
import { ModuleRepository } from "./modules/module/module.repository.js";
import { IModuleService } from "./modules/module/module.service.interface.js";
import { ModuleService } from "./modules/module/module.service.js";
import { ModuleController } from "./modules/module/module.controller.js";
import { IReviewRepository } from "./modules/review/review.repository.interface.js";
import { ReviewRepository } from "./modules/review/review.repository.js";
import { IReviewService } from "./modules/review/review.service.interface.js";
import { ReviewService } from "./modules/review/review.service.js";
import { ReviewController } from "./modules/review/review.controller.js";

dotenv.config();

const appBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options
      .bind<IModuleRepository>(TYPES.ModuleRepository)
      .to(ModuleRepository)
      .inSingletonScope();
    options
      .bind<IModuleService>(TYPES.ModuleService)
      .to(ModuleService)
      .inSingletonScope();
    options
      .bind<ModuleController>(TYPES.ModuleController)
      .to(ModuleController)
      .inSingletonScope();
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
    options.bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
    options.bind<App>(TYPES.Application).to(App);
  },
);

async function bootstrap(): Promise<void> {
  try {
    await connectDB();
    const appContainer = new Container();
    appContainer.load(appBindings);

    const app = appContainer.get<App>(TYPES.Application);
    app.init();
  } catch (error) {
    console.error(`Критическая ошибка - ${error}`);
  }
}

bootstrap();
