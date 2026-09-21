import { inject, injectable } from "inversify";
import { BaseController } from "../../common/base.controller.js";
import { TYPES } from "../../types.js";
import { ILogger } from "../logger/logger.interface.js";
import { IUserService } from "./user.service.interface.js";
import { Request, Response, NextFunction, json } from "express";
import { IUserRegisterDto, userRegisterDto } from "./dto/user.register.dto.js";
import { validateMiddleware } from "../../common/middlewares/validate.middleware.js";

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(TYPES.Logger) logger: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
  ) {
    super(logger);
    this.bindRoutes([
      {
        path: "/register",
        func: this.register,
        method: "post",
        middlewares: [validateMiddleware(userRegisterDto)],
      },
    ]);
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto: IUserRegisterDto = req.body;

      const result = await this.userService.register(dto);
      this.created(res, result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Duplicate Email") {
          this.error(res, 400, "Пользователь с таким email уже существует");
          return;
        }

        if (error.message === "Duplicate phone") {
          this.error(res, 400, "Пользователь с таким номером уже существует");
          return;
        }
      }
    }
  }
}
