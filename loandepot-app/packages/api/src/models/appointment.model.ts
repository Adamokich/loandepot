import { IAppointment } from "@loandepot/types";
import { model, Schema } from "mongoose";

export interface IAppointmentContent extends Omit<IAppointment, "date"> {
  date: Date;
}

const appointmentShema = new Schema<IAppointmentContent>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const AppointmentModel = model<IAppointmentContent>(
  "Appointment",
  appointmentShema,
);
