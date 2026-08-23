import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { App } from "./app";

dotenv.config();

async function bootstrap(): Promise<void> {
  try {
    await connectDB();

    const app = new App();

    app.init();
  } catch (error) {
    console.error(`Критическая ошибка - ${error}`);
  }
}

bootstrap();
