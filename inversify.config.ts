import { Container } from "inversify";

import { BookingController } from "./api/booking/booking.controller";
import { UserController } from "./api/user/user.controller";
import { UserService } from "./api/user/user.service";
import { RentalService } from "./api/rental/rental.service";
import { BookingRepository } from "./repositories/booking.repository";
import { RentalRepository } from "./repositories/rental.repository";
import { UserRepository } from "./repositories/user.repository";
import TYPES from "./types/DI";

const container = new Container();
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container
  .bind<BookingRepository>(TYPES.BookingRepository)
  .to(BookingRepository);
container.bind<RentalRepository>(TYPES.RentalRepository).to(RentalRepository);

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<RentalService>(TYPES.RentalService).to(RentalService);

container.bind<UserController>(TYPES.UserController).to(UserController);
container
  .bind<BookingController>(TYPES.BookingController)
  .to(BookingController);
export default container;
