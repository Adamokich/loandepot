import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { User } from "./models/User";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

connectDB();

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Бэкенд успешно подключен!" });
});

app.post("/user", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на https://localhost:${PORT}`);
});
