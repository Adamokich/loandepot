import { IUser } from "@loandepot/types";
import { IUserRegisterDto } from "./dto/user.register.dto.js";

export interface IUserRepository {
  create: (dto: IUserRegisterDto) => Promise<IUser>;
  findByEmail: (email: string) => Promise<IUser | null>;
  findByPhone: (phone: string) => Promise<IUser | null>;
}
