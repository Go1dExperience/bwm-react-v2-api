import { injectable, inject } from "inversify";
import { RentalRepository } from "../../repositories/rental.repository";
import { StatusCodes } from "http-status-codes";
import { Booking } from "../../lib/db/models";

@injectable()
export class RentalService {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: RentalRepository // Replace 'any' with the actual type of your RentalRepository
  ) {}
  createBookingForRental = async (
    rentalId: string,
    booking: Booking,
    userId: string
  ) => {
    const rental = await this.rentalRepository.findOne({
      where: { id: rentalId },
      include: ["bookings", "user"],
    });
    if (!rental) {
      return {
        data: null,
        message: `Cannot find rental with id ${rentalId}`,
        errorCode: StatusCodes.UNPROCESSABLE_ENTITY,
      };
    }
    if (rental.user!.id === userId) {
      return {
        data: null,
        message: "Cannot book your own rental",
        errorCode: StatusCodes.UNPROCESSABLE_ENTITY,
      };
    }
  };
}
