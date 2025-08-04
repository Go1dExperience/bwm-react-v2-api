import { injectable } from "inversify";
import { Booking } from "../lib/db/models";
import { BaseRepository } from "./base.repository";

@injectable()
export class BookingRepository extends BaseRepository<Booking> {
  constructor() {
    super(Booking);
  }
}
