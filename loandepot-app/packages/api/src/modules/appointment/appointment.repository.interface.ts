import { IAppointment } from "@loandepot/types";
import { IAppointmentContent } from "../../models/appointment.model.js";
import { IAppointmentDto } from "./dto/appointment.dto.js";

export interface IAppointmentRepository {
  create: (dto: IAppointmentDto) => Promise<IAppointmentContent>;
  findByEmail: (email: string) => Promise<IAppointmentContent | null>;
  findByDate: (date: Date) => Promise<IAppointmentContent | null>;
}
