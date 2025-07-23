import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import moment from "moment";

import { Booking, User } from "../../lib/db/models";
import TYPES from "../../types/DI";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../utils/apiResponse";
import { Validator } from "../../utils/validator";
import { CreateBookingDTO } from "./booking.dto";
import { BookingService } from "./booking.service";

@injectable()
export class BookingController {
  constructor(
    @inject(TYPES.BookingService)
    private bookingService: BookingService
  ) {}
  createBooking = async (req: Request, res: Response) => {
    const dto = plainToClass(CreateBookingDTO, req.body);
    const errors = await Validator.validate(dto);
    if (errors.length > 0) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send(
          createErrorResponse(
            StatusCodes.BAD_REQUEST,
            "Invalid create booking data: " + errors
          )
        );
      return;
    }
    const { startAt, endAt, totalPrice, guests, days, rentalId } = dto;
    const startTime = moment(startAt, "Y/MM/DD").add(1, "day").toDate();
    const endTime = moment(endAt, "Y/MM/DD").toDate();
    const user: User = req.user!;
    const booking = new Booking({
      startAt: startTime,
      endAt: endTime,
      totalPrice,
      guests,
      days,
    });
    const response = await this.bookingService.createBookingForRental(
      rentalId,
      booking,
      user.id
    );
    res
      .status(StatusCodes.OK)
      .send(createSuccessResponse(response, "Booking created successfully"));
  };
  public getBookingByUserId = async (req: Request, res: Response) => {
    const user: User = req.user!;
    const bookings = await this.bookingService.getBookingsByUserId(user.id);
    res
      .status(StatusCodes.OK)
      .send(createSuccessResponse(bookings, "Bookings retrieved successfully"));
  };
}
