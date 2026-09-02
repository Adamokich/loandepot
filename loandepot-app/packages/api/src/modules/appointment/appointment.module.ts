import { ContainerModule } from "inversify";
import { AppointmentRepository } from "./appointment.repository.js";
import { TYPES } from "../../types.js";
import { IAppointmentRepository } from "./appointment.repository.interface.js";
import { IAppointmentService } from "./appointment.service.interface.js";
import { AppointmentService } from "./appointment.service.js";
import { AppointmentController } from "./appointment.conroller.js";

export const appointmentModule = new ContainerModule((options) => {
  options
    .bind<IAppointmentRepository>(TYPES.AppointmentRepository)
    .to(AppointmentRepository)
    .inSingletonScope();
  options
    .bind<IAppointmentService>(TYPES.AppointmentService)
    .to(AppointmentService)
    .inSingletonScope();
  options
    .bind<AppointmentController>(TYPES.AppointmentController)
    .to(AppointmentController)
    .inSingletonScope();
});
