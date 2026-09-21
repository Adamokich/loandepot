import "reflect-metadata";
import { ILogObj, Logger } from "tslog";
import { ILogger } from "./logger.interface.js";
import { injectable } from "inversify";

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger<ILogObj>({
      type: "pretty",
      prettyLogTemplate: "{{hh}}:{{MM}}:{{ss}} {{logLevelName}} ",
    });
  }

  public log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  public error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  public warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
