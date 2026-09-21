import { IModule } from "@loandepot/types";

export interface IModuleRepository {
  findAllModules: () => Promise<IModule[]>;
}
