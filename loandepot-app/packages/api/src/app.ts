import express, { Application, Router } from "express";
import { Server } from "http";
import { ILogger } from "./modules/logger/logger.interface.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types.js";
import { ModuleController } from "./modules/module/module.controller.js";
import { UserController } from "./modules/user/user.controller.js";
import { ReviewController } from "./modules/review/review.controller.js";

@injectable()
export class App {
  private _app: Application;
  port: number;
  server!: Server;

  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.ModuleController) private moduleController: ModuleController,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ReviewController) private reviewController: ReviewController,
  ) {
    this._app = express();
    this.port = Number(process.env.PORT);
  }

  public get app(): Application {
    return this._app;
  }

  private useMiddleware(): void {
    this._app.use(express.json());
  }

  private useRoutes(): void {
    const apiRouter = Router();
    const userRouter = Router();

    apiRouter.use(this.moduleController.router);
    apiRouter.use(this.reviewController.router);
    userRouter.use(this.userController.router);

    this._app.use("/api", apiRouter);
    this._app.use("/users", userRouter);
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();

    this.server = this.app.listen(this.port, () => {
      this.logger.log("Success!");
    });
  }
}
