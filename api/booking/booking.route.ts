import express from "express";
import container from "../../inversify.config";
import { BookingController } from "./booking.controller";

const router = express.Router();
const bookingController = container.get<BookingController>("BookingController");

router.post("/", bookingController.createBooking.bind(bookingController));
router.get("/user", bookingController.getBookingByUserId.bind(bookingController));

export default router;