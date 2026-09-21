import { IModule } from "@loandepot/types";

export interface IModuleService {
  getAllModules: () => Promise<IModule[]>;
}
