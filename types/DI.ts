// Dependency Injection Types
const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  BookingRepository: Symbol.for("BookingRepository"),
  RentalRepository: Symbol.for("RentalRepository"),

	UserService: Symbol.for("UserService"),

  UserController: Symbol.for("UserController"),
};
export default TYPES;
