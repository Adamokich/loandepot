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

dotenv.config();

const appBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
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
