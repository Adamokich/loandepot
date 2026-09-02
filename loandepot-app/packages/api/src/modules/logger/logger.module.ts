import { ContainerModule } from "inversify";
import { ILogger } from "./logger.interface.js";
import { TYPES } from "../../types.js";
import { LoggerService } from "./logger.service.js";

export const loggerModule = new ContainerModule((options) => {
  options.bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
});
