import { IUser } from "@loandepot/types";
import { IUserRegisterDto } from "./dto/user.register.dto.js";

export interface IUserService {
  register: (dto: IUserRegisterDto) => Promise<IUser>;
}
