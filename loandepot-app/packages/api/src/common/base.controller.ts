import { Router, Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import { IControllerRoute } from "./route.interface.js";
import { ILogger } from "../modules/logger/logger.interface.js";
import { AsyncLocalStorage } from "async_hooks";

@injectable()
export abstract class BaseController {
  private readonly _router: Router;
  private static storage = new AsyncLocalStorage<{ res: Response }>();

  constructor(@inject(TYPES.Logger) protected logger: ILogger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  private get currentResponse(): Response {
    const store = BaseController.storage.getStore();

    if (!store) {
      throw new Error("Response не является доступным для внешних запросов");
    }

    return store.res;
  }

  private send<T>(res: Response, code: number, data: T): Response {
    res.type("application/json");
    return res.status(code).json(data);
  }

  public ok<T>(data: T): Response {
    return this.currentResponse.status(200).json(data);
  }

  public created<T>(data: T): Response {
    return this.currentResponse.status(201).json(data);
  }

  public error<T>(code: number, message: T): Response {
    return this.currentResponse.status(code).json({ message });
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`${route.method} ${route.path}`);
      const middlewares = route.middlewares || [];
      const handler = route.func.bind(this);

      const contextMiddleware = (
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        BaseController.storage.run({ res }, () => {
          Promise.resolve(handler(req, res, next)).catch(next);
        });
      };
      this._router[route.method](route.path, ...middlewares, contextMiddleware);
    }
  }
}
