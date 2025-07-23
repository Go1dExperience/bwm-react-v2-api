import { instanceToPlain } from "class-transformer";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import moment from "moment";

import { Booking, Rental } from "../../lib/db/models";
import { BookingRepository } from "../../repositories/booking.repository";
import { RentalRepository } from "../../repositories/rental.repository";
import { CustomError } from "../../utils/customError";
import { BookingResponseDTO } from "./booking.dto";
import TYPES from "../../types/DI";

@injectable()
export class BookingService {
  constructor(
    @inject(TYPES.BookingRepository)
    private bookingRepository: BookingRepository,
    @inject(TYPES.RentalRepository)
    private rentalRepository: RentalRepository
  ) {}
  private validateBookingDate = (newBooking: Booking, rental: Rental) => {
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
    const isValidBookingDate = this.validateBookingDate(booking, rental);
    if (!isValidBookingDate) {
      throw new CustomError(
        StatusCodes.BAD_REQUEST,
        "This property is already booked in the chosen range"
      );
    }
    const createdBooking = await this.bookingRepository.create({
      ...booking,
      userId,
      rentalId: rental.id,
    });
    const response = new BookingResponseDTO(createdBooking);
    return instanceToPlain(response);
  };
  public getBookingsByUserId = async (userId: string) => {
    const bookings = await this.bookingRepository.findAll({
      where: { userId },
      include: ["rental"],
    });
    if (!bookings || bookings.length === 0) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        `No bookings found for user with id ${userId}`
      );
    }
    return bookings
      .map((booking) => new BookingResponseDTO(booking))
      .map((booking) => instanceToPlain(booking));
  };
}
