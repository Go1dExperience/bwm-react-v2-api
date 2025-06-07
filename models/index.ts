import { Booking } from "./booking";
import { Rental } from "./rental";
import { User } from "./user";

User.hasMany(Booking, {
  foreignKey: "user",
  as: "bookings",
});
Booking.belongsTo(User, {
  foreignKey: "user",
  as: "user",
});

User.hasMany(Rental, {
  foreignKey: "user",
  as: "rentals",
});
Rental.belongsTo(User, {
  foreignKey: "user",
  as: "user",
});

Rental.hasMany(Booking, {
  foreignKey: "rental",
  as: "bookings",
});
Booking.belongsTo(Rental, {
  foreignKey: "rental",
  as: "rental",
});

export { User, Rental, Booking };
