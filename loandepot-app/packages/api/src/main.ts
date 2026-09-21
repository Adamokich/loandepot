import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { App } from "./app.js";
import { TYPES } from "./types.js";
import { container } from "./container.js";

dotenv.config();
container.bind<App>(TYPES.Application).to(App).inSingletonScope();

async function bootstrap(): Promise<void> {
  try {
    await connectDB();

    const app = container.get<App>(TYPES.Application);
    app.init();
  } catch (error) {
    console.error(`Критическая ошибка - ${error}`);
  }
}

bootstrap();
