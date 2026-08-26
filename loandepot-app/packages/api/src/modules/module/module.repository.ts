import { IModule } from "@loandepot/types";
import { IModuleRepository } from "./module.repository.interface.js";
import { ModuleModel } from "../../models/modules.model.js";
import { injectable } from "inversify";

@injectable()
export class ModuleRepository implements IModuleRepository {
  public async findAllModules(): Promise<IModule[]> {
    return ModuleModel.find({}).sort({ moduleId: 1 }).lean();
  }
}
