import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("Ошибка! Переменная MONGO_URI не была определена!");
    }

    const mongoUriConnect = await mongoose.connect(mongoUri);
    console.log(
      `MongoDb успешно подключена к ${mongoUriConnect.connection.host}`,
    );
  } catch (error) {
    console.error(
      `Ошибка при подключении к MongoDB: ${(error as Error).message}`,
    );
  }
};
