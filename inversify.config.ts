import { UserController } from "./api/user/user.controller";
import { Container } from "inversify";
import TYPES from "./types/DI";

const container = new Container();
import { UserRepository } from "./repositories/user.repository";
import { BookingRepository } from "./repositories/booking.repository";
import { RentalRepository } from "./repositories/rental.repository";
import { UserService } from "./api/user/user.service";

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container
  .bind<BookingRepository>(TYPES.BookingRepository)
  .to(BookingRepository);
container.bind<RentalRepository>(TYPES.RentalRepository).to(RentalRepository);

container.bind<UserService>(TYPES.UserService).to(UserService);

container.bind<UserController>(TYPES.UserController).to(UserController);
export default container;
