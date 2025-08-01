import { injectable } from "inversify";
import { Rental } from "../lib/db/models";
import { BaseRepository } from "./base.repository";

@injectable()
export class RentalRepository extends BaseRepository<Rental> {
  constructor() {
    super(Rental);
  }
}
