import { inject, injectable } from "inversify";
import { IAppointmentDto } from "./dto/appointment.dto.js";
import { IAppointment } from "@loandepot/types";
import { IAppointmentContent } from "../../models/appointment.model.js";
import { TYPES } from "../../types.js";
import { IAppointmentRepository } from "./appointment.repository.interface.js";
import { IAppointmentService } from "./appointment.service.interface.js";

@injectable()
export class AppointmentService implements IAppointmentService {
  constructor(
    @inject(TYPES.AppointmentRepository)
    private appointmentRepository: IAppointmentRepository,
  ) {}
  public async registerAppointment(
    dto: IAppointmentDto,
  ): Promise<IAppointmentContent> {
    const email = await this.appointmentRepository.findByEmail(dto.email);
    const date = await this.appointmentRepository.findByDate(dto.date);

    if (email) {
      throw new Error("Duplicate email");
    }

    if (date) {
      throw new Error("Duplicate date");
    }

    return this.appointmentRepository.create(dto);
  }
}
