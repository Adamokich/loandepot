import { inject, injectable } from "inversify";
import { BaseController } from "../../common/base.controller.js";
import { TYPES } from "../../types.js";
import { ILogger } from "../logger/logger.interface.js";
import { IModuleService } from "./module.service.interface.js";
import { Request, Response } from "express";

@injectable()
export class ModuleController extends BaseController {
  constructor(
    @inject(TYPES.Logger) logger: ILogger,
    @inject(TYPES.ModuleService) private moduleService: IModuleService,
  ) {
    super(logger);
    this.bindRoutes([
      {
        path: "/modules",
        func: this.getModules,
        method: "get",
      },
    ]);
  }

  async getModules(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.moduleService.getAllModules();
      this.ok(res, result);
    } catch (error) {
      this.logger.error(
        "[ModuleController]: произошла непредвиденная ошибка",
        error,
      );
      this.error(res, 500, "Не удалось загрузить модули");
    }
  }
}
