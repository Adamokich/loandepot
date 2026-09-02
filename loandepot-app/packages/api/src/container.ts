import { Container } from "inversify";
import { loggerModule } from "./modules/logger/logger.module.js";
import { appointmentModule } from "./modules/appointment/appointment.module.js";
import { modulesModule } from "./modules/module/module.module.js";
import { reviewModule } from "./modules/review/review.module.js";
import { userModule } from "./modules/user/user.module.js";

const container = new Container();

container.load(
  loggerModule,
  appointmentModule,
  modulesModule,
  reviewModule,
  userModule,
);

export { container };
