// Dependency Injection Types
const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  BookingRepository: Symbol.for("BookingRepository"),
  RentalRepository: Symbol.for("RentalRepository"),

  UserService: Symbol.for("UserService"),
  RentalService: Symbol.for("RentalService"),
  BookingService: Symbol.for("BookingService"),
  AuthService: Symbol.for("AuthService"),

  UserController: Symbol.for("UserController"),
  BookingController: Symbol.for("BookingController"),
  RentalController: Symbol.for("RentalController"),
  AuthController: Symbol.for("AuthController"),
};
export default TYPES;
