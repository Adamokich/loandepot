import { ContainerModule } from "inversify";
import { IUserRepository } from "./user.repository.interface.js";
import { TYPES } from "../../types.js";
import { UserRepository } from "./user.repository.js";
import { IUserService } from "./user.service.interface.js";
import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";

export const userModule = new ContainerModule((options) => {
  options
    .bind<IUserRepository>(TYPES.UserRepository)
    .to(UserRepository)
    .inSingletonScope();
  options
    .bind<IUserService>(TYPES.UserService)
    .to(UserService)
    .inSingletonScope();
  options
    .bind<UserController>(TYPES.UserController)
    .to(UserController)
    .inSingletonScope();
});
