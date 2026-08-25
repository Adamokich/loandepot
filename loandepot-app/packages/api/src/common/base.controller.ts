import { Router, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../types.js";
import { ILogger } from "../logger/logger.interface.js";
import { IControllerRoute } from "./route.interface.js";

export abstract class BaseController {
  private readonly _router: Router;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  private send<T>(res: Response, code: number, data: T): Response {
    res.type("application/json");
    return res.status(code).json(data);
  }

  public ok<T>(res: Response, code: number, data: T): Response {
    return this.send(res, code, data);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`${route.method} ${route.path}`);
      this.router[route.method](route.path);
    }
  }
}
