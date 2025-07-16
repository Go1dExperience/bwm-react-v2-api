import { RentalRepository } from './../../repositories/rental.repository';
import { inject, injectable } from "inversify";
import { BookingRepository } from "../../repositories/booking.repository";
import { Booking, Rental } from "../../lib/db/models";
import moment from "moment";
import { CustomError } from '../../utils/customError';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class BookingService {
  constructor(
    @inject("BookingRepository")
    private bookingRepository: BookingRepository,
    @inject("RentalRepository")
    private rentalRepository: RentalRepository,
  ) {}
  public validateBookingDate = (newBooking: Booking, rental: Rental) => {
    if (!rental.bookings || rental.bookings.length === 0) {
      return true;
    }
    return rental.bookings.every((booking) => {
      const newBookingStart = moment(newBooking.startAt);
      const newBookingEnd = moment(newBooking.endAt);
      const bookedStart = moment(booking.startAt);
      const bookedEnd = moment(booking.endAt);
      const isLater =
        bookedStart < newBookingStart && bookedEnd < newBookingEnd;
      const isSooner =
        newBookingStart < bookedEnd && newBookingEnd < bookedStart;
      return isSooner || isLater;
    });
  };
  public createBookingForRental = async (
    rentalId: string,
    booking: Booking,
    userId: string
  ) => {
    const rental = await this.rentalRepository.findOne({
      where: { id: rentalId },
      include: ["bookings", "user"],
    });
    if (!rental) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        `Cannot find rental with id ${rentalId}`
      );
    }
    if (rental.user!.id === userId) {
      throw new CustomError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "Cannot book your own rental"
      );
    }
    const isValidBookingDate = this.validateBookingDate(
      booking,
      rental
    );
    if (!isValidBookingDate) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        "This property is already booked in the chosen range"
      );
    }
    return await this.bookingRepository.create({
      ...booking,
      userId,
      rentalId: rental.id,
    });
  };
}
