import { model, Schema } from "mongoose";
import { IUser } from "@loandepot/types";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Имя обязательно для заполнения"],
  },
  email: {
    type: String,
    required: [true, "Email обязателен для заполнения"],
    unique: true,
    lowercase: true,
  },
});

export const User = model<IUser>("User", userSchema);
