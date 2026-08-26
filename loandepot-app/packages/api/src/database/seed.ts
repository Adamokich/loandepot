import dotenv from "dotenv";
import mongoose from "mongoose";
import { ModuleModel } from "../models/modules.model.js";
import { mockModules } from "./seeds/module.seed.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function runSeed() {
  if (!MONGO_URI) {
    console.error("Ошибка! Ссылка на БД не найдена");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);

    await ModuleModel.deleteMany({});

    await ModuleModel.insertMany(mockModules);
  } catch (error) {
    console.error(`Произошла ошибка, подробнее: ${error}`);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runSeed();
