import express from "express";

import container from "../../inversify.config";
import { RouterConfig } from "../../types";
import TYPES from "../../types/DI";
import { BookingController } from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth";

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
      authMiddleware(),
      this.bookingController.createBooking.bind(this.bookingController)
    );
    this.router.get(
      "/user",
      authMiddleware(),
      this.bookingController.getBookingByUserId.bind(this.bookingController)
    );
  }
}
