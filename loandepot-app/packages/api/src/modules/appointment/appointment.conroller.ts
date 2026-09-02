import { inject, injectable } from "inversify";
import { BaseController } from "../../common/base.controller.js";
import { TYPES } from "../../types.js";
import { ILogger } from "../logger/logger.interface.js";
import { IAppointmentService } from "./appointment.service.interface.js";
import { Request, Response, NextFunction } from "express";
import { appointmentDto, IAppointmentDto } from "./dto/appointment.dto.js";
import { validateMiddleware } from "../../common/middlewares/validate.middleware.js";

@injectable()
export class AppointmentController extends BaseController {
  constructor(
    @inject(TYPES.Logger) logger: ILogger,
    @inject(TYPES.AppointmentService)
    private appointmentService: IAppointmentService,
  ) {
    super(logger);
    this.bindRoutes([
      {
        path: "/register",
        func: this.registerAppointment,
        middlewares: [validateMiddleware(appointmentDto)],
        method: "post",
      },
    ]);
  }

  async registerAppointment(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto: IAppointmentDto = req.body;

      const result = await this.appointmentService.registerAppointment(dto);
      this.created(res, result);
      return;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Duplicate email") {
          this.error(
            res,
            400,
            "Пользователь с таким email уже забронировал встречу",
          );
        }

        if (error.message === "Duplicate date") {
          this.error(res, 400, "На эту дату уже назначена встреча");
        }

        this.error(res, 400, error.message);
        return;
      }
    }
  }
}
