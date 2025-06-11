import { injectable } from "inversify";
import { BookingRepository } from "../../repositories/booking.repository";

@injectable()
export class BookingService {
  constructor(private bookingRepository: BookingRepository) {}
}
