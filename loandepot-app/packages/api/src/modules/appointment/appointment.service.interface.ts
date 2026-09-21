import { IAppointmentDto } from "./dto/appointment.dto.js";
import { IAppointmentContent } from "../../models/appointment.model.js";

export interface IAppointmentService {
  registerAppointment: (dto: IAppointmentDto) => Promise<IAppointmentContent>;
}
