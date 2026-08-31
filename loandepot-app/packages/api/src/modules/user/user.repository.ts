import { IUser } from "@loandepot/types";
import { injectable } from "inversify";
import { IUserRepository } from "./user.repository.interface.js";
import { UserModel } from "../../models/user.model.js";
import { IUserRegisterDto } from "./dto/user.register.dto.js";

@injectable()
export class UserRepository implements IUserRepository {
  public async create(dto: IUserRegisterDto): Promise<IUser> {
    const user = new UserModel(dto);

    return await user.save();
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email: email.toLowerCase() });
  }

  public async findByPhone(phone: string): Promise<IUser | null> {
    return await UserModel.findOne({ phone: phone });
  }
}
