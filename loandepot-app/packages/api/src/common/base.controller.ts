import { Router, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import { IControllerRoute } from "./route.interface.js";
import { ILogger } from "../modules/logger/logger.interface.js";

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(@inject(TYPES.Logger) protected logger: ILogger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  private send<T>(res: Response, code: number, data: T): Response {
    res.type("application/json");
    return res.status(code).json(data);
  }

  public ok<T>(res: Response, data: T): Response {
    return this.send(res, 200, data);
  }

  public error<T>(res: Response, code: number, message: T): Response {
    return this.send(res, code, {
      statusCode: code,
      message,
    });
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`${route.method} ${route.path}`);
      const handler = route.func.bind(this);
      this._router[route.method](route.path, handler);
    }
  }
}
