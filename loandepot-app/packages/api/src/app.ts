import express, { Application } from "express";
import { Server } from "http";

export class App {
  private _app: Application;
  port: number;
  server!: Server;

  constructor() {
    this._app = express();
    this.port = Number(process.env.PORT);
  }

  public get app(): Application {
    return this._app;
  }

  private useMiddleware(): void {
    this._app.use(express.json());
  }

  private useRoutes(): void {
    this._app.get("/health", (req, res) => {
      res.status(200).json({ message: "Бэк работает" });
    });
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();

    this.server = this.app.listen(this.port, () => {
      console.log("Успешный запуск сервера");
    });
  }
}
