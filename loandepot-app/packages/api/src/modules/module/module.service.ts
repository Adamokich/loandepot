import { IModule } from "@loandepot/types";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import { IModuleRepository } from "./module.repository.interface.js";
import { IModuleService } from "./module.service.interface.js";

@injectable()
export class ModuleService implements IModuleService {
  constructor(
    @inject(TYPES.ModuleRepository)
    private moduleRepository: IModuleRepository,
  ) {}

  public async getAllModules(): Promise<IModule[]> {
    return this.moduleRepository.findAllModules();
  }
}
