import express, { Application, Router } from "express";
import { Server } from "http";
import { ILogger } from "./modules/logger/logger.interface.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types.js";
import { ModuleController } from "./modules/module/module.controller.js";
import { UserController } from "./modules/user/user.controller.js";
import { ReviewController } from "./modules/review/review.controller.js";
import { AppointmentController } from "./modules/appointment/appointment.conroller.js";
import { exceptionFilter } from "./common/middlewares/exception.filter.js";
import cors from "cors";

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
    @inject(TYPES.AppointmentController)
    private appointmentController: AppointmentController,
  ) {
    this._app = express();
    this.port = Number(process.env.PORT) || 10000;
  }

  public get app(): Application {
    return this._app;
  }

  private useMiddleware(): void {
    this._app.use(express.json());

    this._app.use(
      cors({
        origin: [process.env.CLIENT_URL!, process.env.BASIC_URL!],
      }),
    );
  }

  private useRoutes(): void {
    const routes = {
      "/api": [this.moduleController, this.reviewController],
      "/users": [this.userController],
      "/appointments": [this.appointmentController],
    };

    for (const [endpoint, controllers] of Object.entries(routes)) {
      const router = Router();

      for (const contoller of controllers) {
        router.use(contoller.router);
      }

      this._app.use(endpoint, router);
    }
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this._app.use(exceptionFilter);

    this.server = this.app.listen(this.port, "0.0.0.0", () => {
      this.logger.log("Success!");
    });
  }
}
