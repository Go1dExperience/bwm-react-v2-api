import { Booking } from "./booking";
import { Rental } from "./rental";
import { User } from "./user";

User.hasMany(Booking, {
  foreignKey: "user",
  as: "bookings",
});
Booking.belongsTo(User, {
  foreignKey: "user",
  as: "owner",
});

User.hasMany(Rental, {
  foreignKey: "userId",
  as: "rentals",
});
Rental.belongsTo(User, {
  foreignKey: "id",
  as: "owner",
});

Rental.hasMany(Booking, {
  foreignKey: "rental",
  as: "bookings",
});
Booking.belongsTo(Rental, {
  foreignKey: "rental",
  as: "property",
});

export { User, Rental, Booking };
