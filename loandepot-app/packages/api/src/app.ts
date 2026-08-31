import express, { Application } from "express";
import { Server } from "http";
import { ILogger } from "./modules/logger/logger.interface.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types.js";
import { ModuleController } from "./modules/module/module.controller.js";
import { UserController } from "./modules/user/user.controller.js";

@injectable()
export class App {
  private _app: Application;
  port: number;
  server!: Server;

  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.ModuleController) private moduleController: ModuleController,
    @inject(TYPES.UserController) private userController: UserController,
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
    this._app.use("/api", this.moduleController.router);
    this._app.use("/users", this.userController.router);
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();

    this.server = this.app.listen(this.port, () => {
      this.logger.log("Success!");
    });
  }
}
