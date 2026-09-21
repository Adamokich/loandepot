import dotenv from "dotenv";
import mongoose, { Model } from "mongoose";
import { ModuleModel } from "../models/modules.model.js";
import { mockModules } from "./seeds/module.seed.js";
import { ReviewModel } from "../models/reviews.model.js";
import { mockReviews } from "./seeds/review.seed.js";
import { connectDB } from "../config/db.js";
dotenv.config();

interface ISeedItem {
  model: Model<any>;
  data: unknown[];
}

const MONGO_URI = process.env.MONGO_URI;
const models: ISeedItem[] = [
  {
    model: ModuleModel,
    data: mockModules,
  },
  {
    model: ReviewModel,
    data: mockReviews,
  },
];

async function runSeed() {
  if (!MONGO_URI) {
    console.error("Ошибка! Ссылка на БД не найдена");
    process.exit(1);
  }

  try {
    await connectDB();

    for (const item of models) {
      await item.model.deleteMany({});
      await item.model.insertMany(item.data);
    }
  } catch (error) {
    console.error(`Произошла ошибка, подробнее: ${error}`);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runSeed();
