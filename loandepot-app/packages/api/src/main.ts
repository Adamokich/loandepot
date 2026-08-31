import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { App } from "./app.js";
import {
  Container,
  ContainerModule,
  ContainerModuleLoadOptions,
} from "inversify";
import { ILogger } from "./modules/logger/logger.interface.js";
import { TYPES } from "./types.js";
import { LoggerService } from "./modules/logger/logger.service.js";
import { IModuleRepository } from "./modules/module/module.repository.interface.js";
import { ModuleRepository } from "./modules/module/module.repository.js";
import { IModuleService } from "./modules/module/module.service.interface.js";
import { ModuleService } from "./modules/module/module.service.js";
import { ModuleController } from "./modules/module/module.controller.js";
import { IUserRepository } from "./modules/user/user.repository.interface.js";
import { UserRepository } from "./modules/user/user.repository.js";
import { IUserService } from "./modules/user/user.service.interface.js";
import { UserService } from "./modules/user/user.service.js";
import { UserController } from "./modules/user/user.controller.js";

dotenv.config();

const appBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options
      .bind<IModuleRepository>(TYPES.ModuleRepository)
      .to(ModuleRepository)
      .inSingletonScope();
    options
      .bind<IModuleService>(TYPES.ModuleService)
      .to(ModuleService)
      .inSingletonScope();
    options
      .bind<ModuleController>(TYPES.ModuleController)
      .to(ModuleController)
      .inSingletonScope();
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
    options.bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
    options.bind<App>(TYPES.Application).to(App);
  },
);

async function bootstrap(): Promise<void> {
  try {
    await connectDB();
    const appContainer = new Container();
    appContainer.load(appBindings);

    const app = appContainer.get<App>(TYPES.Application);
    app.init();
  } catch (error) {
    console.error(`Критическая ошибка - ${error}`);
  }
}

bootstrap();
