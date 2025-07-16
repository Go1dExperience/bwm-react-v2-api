import { Rental } from "../../lib/db/models";

export interface CreateBookingPayload {
  startAt: Date;
  endAt: Date;
  guests: number;
  days: number;
  rental: Rental;
  totalPrice: number;
}
