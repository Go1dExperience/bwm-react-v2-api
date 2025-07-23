import { BookingService } from "./api/booking/booking.service";
import { Container } from "inversify";

import { BookingController } from "./api/booking/booking.controller";
import { RentalController } from "./api/rental/rental.controller";
import { UserController } from "./api/user/user.controller";
import { UserService } from "./api/user/user.service";
import { RentalService } from "./api/rental/rental.service";
import { BookingRepository } from "./repositories/booking.repository";
import { RentalRepository } from "./repositories/rental.repository";
import { UserRepository } from "./repositories/user.repository";
import { AuthService } from "./api/auth/auth.service";
import TYPES from "./types/DI";
import { AuthController } from "./api/auth/auth.controller";

const container = new Container();
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container
  .bind<BookingRepository>(TYPES.BookingRepository)
  .to(BookingRepository);
container.bind<RentalRepository>(TYPES.RentalRepository).to(RentalRepository);

container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<RentalService>(TYPES.RentalService).to(RentalService).inSingletonScope();
container.bind<BookingService>(TYPES.BookingService).to(BookingService).inSingletonScope();
container.bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();

container.bind<UserController>(TYPES.UserController).to(UserController);
container
  .bind<BookingController>(TYPES.BookingController)
  .to(BookingController);
container.bind<RentalController>(TYPES.RentalController).to(RentalController);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
export default container;
