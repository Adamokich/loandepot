import { injectable, inject } from "inversify";
import { IUserService } from "./user.service.interface.js";
import { TYPES } from "../../types.js";
import { IUserRepository } from "./user.repository.interface.js";
import { IUser } from "@loandepot/types";
import { IUserRegisterDto } from "./dto/user.register.dto.js";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
  ) {}

  public async register(dto: IUserRegisterDto): Promise<IUser> {
    const email = await this.userRepository.findByEmail(dto.email);
    const phone = await this.userRepository.findByPhone(dto.phone);

    if (email) {
      throw new Error("Duplicate Email");
    }

    if (phone) {
      throw new Error("Duplicate phone");
    }

    return this.userRepository.create(dto);
  }
}
