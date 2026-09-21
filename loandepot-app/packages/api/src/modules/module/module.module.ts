import { ContainerModule } from "inversify";
import { IModuleRepository } from "./module.repository.interface.js";
import { TYPES } from "../../types.js";
import { ModuleRepository } from "./module.repository.js";
import { IModuleService } from "./module.service.interface.js";
import { ModuleService } from "./module.service.js";
import { ModuleController } from "./module.controller.js";

export const modulesModule = new ContainerModule((options) => {
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
});
