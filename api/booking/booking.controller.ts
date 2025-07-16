import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import moment from "moment";

import { Booking, User } from "../../lib/db/models";
import { RentalRepository } from "../../repositories/rental.repository";
import TYPES from "../../types/DI";
import { BookingService } from "./booking.service";
import { CreateBookingPayload } from "./booking.type";
import { RentalService } from "../rental/rental.service";

@injectable()
export class BookingController {
  constructor(
    @inject(TYPES.UserService)
    private bookingService: BookingService,
    @inject(TYPES.RentalService)
    private rentalService: RentalService
  ) {}
  createBooking = async (req: Request, res: Response) => {
    const { startAt, endAt, totalPrice, guests, days, rental } =
      req.body as CreateBookingPayload;
    const startTime = moment(startAt, "Y/MM/DD").add(1, "day");
    const endTime = moment(endAt, "Y/MM/DD");
    // User was saved by User Controller.
    const user: User = res.locals.user;
    const booking = new Booking({ startAt, endAt, totalPrice, guests, days });

    const response = await this.rentalService.createBookingForRental(
      rental.id,
      booking,
      user.id
    );

    // Rental.findById(rental._id)
    //   .populate("bookings")
    //   .populate("user")
    //   .exec(function (err, foundRental) {
    //     if (err) {
    //       return res.status(422).send({ errors: normalizeErrors(err.errors) });
    //     }
    //     // _id is an object, so when comparing we need to use id, which is a string
    //     if (foundRental.user.id === user.id) {
    //       return res.status(422).send({
    //         errors: [
    //           {
    //             title: "Invalid User",
    //             detail: "Cannot book your own rental",
    //           },
    //         ],
    //       });
    //     }
    //     if (!startAt || !endAt || !guests) {
    //       return res.status(422).send({
    //         errors: [
    //           {
    //             title: "Invalid Booking",
    //             detail: "Please fill in all the information",
    //           },
    //         ],
    //       });
    //     }
    //     if (validBooking(booking, foundRental)) {
    //       // Update booking
    //       booking.user = user;
    //       booking.rental = foundRental;
    //       foundRental.bookings.push(booking);

    //       booking.save(function (err) {
    //         if (err) {
    //           return res
    //             .status(422)
    //             .send({ errors: normalizeErrors(err.errors) });
    //         }
    //         foundRental.save();
    //         // Because saving here will cause pre-save hook in user model to change password
    //         // we have to change it to update method
    //         User.updateOne(
    //           { _id: user.id },
    //           {
    //             $push: {
    //               bookings: booking,
    //             },
    //           },
    //           function (err) {}
    //         );
    //       });
    //       return res.json({
    //         startAt: booking.startAt,
    //         endAt: booking.endAt,
    //       });
    //     } else {
    //       return res.status(422).send({
    //         errors: [
    //           {
    //             title: "Invalid Booking",
    //             detail: "This place is already booked on the chosen day",
    //           },
    //         ],
    //       });
    //     }
    //   });
  };
}
