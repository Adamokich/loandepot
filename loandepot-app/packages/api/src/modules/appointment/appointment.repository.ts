import { IAppointment } from "@loandepot/types";
import { IAppointmentRepository } from "./appointment.repository.interface.js";
import {
  AppointmentModel,
  IAppointmentContent,
} from "../../models/appointment.model.js";
import { injectable } from "inversify";
import { IAppointmentDto } from "./dto/appointment.dto.js";

@injectable()
export class AppointmentRepository implements IAppointmentRepository {
  public async create(dto: IAppointmentDto): Promise<IAppointmentContent> {
    const appointment = new AppointmentModel(dto);

    return await appointment.save();
  }

  public async findByEmail(email: string): Promise<IAppointmentContent | null> {
    return AppointmentModel.findOne({ email: email.toLowerCase() });
  }

  public async findByDate(date: Date): Promise<IAppointmentContent | null> {
    return AppointmentModel.findOne({ date });
  }
}
