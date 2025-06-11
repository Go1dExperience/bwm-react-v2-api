import { injectable } from "inversify";
import { Booking, Rental, User } from "../lib/db/models";
import { BaseRepository } from "./base.repository";

@injectable()
export class BookingRepository extends BaseRepository<Booking> {
  constructor() {
    super(Booking);
  }
  findByUserId(userId: number): Promise<Booking[]> {
    return this.findAll({
      where: { user: userId },
      include: [
        { model: User, as: "user" },
        { model: Rental, as: "rental" },
      ],
    });
  }
}
