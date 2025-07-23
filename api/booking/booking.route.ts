import express from "express";

import container from "../../inversify.config";
import { RouterConfig } from "../../types";
import TYPES from "../../types/DI";
import { BookingController } from "./booking.controller";

export class BookingRoutes implements RouterConfig {
  public path = "/bookings";
  public router = express.Router();
  private bookingController: BookingController;

  constructor() {
    this.bookingController = container.get<BookingController>(
      TYPES.BookingController
    );
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      "/",
      this.bookingController.createBooking.bind(this.bookingController)
    );
    this.router.get(
      "/user",
      this.bookingController.getBookingByUserId.bind(this.bookingController)
    );
  }
}
