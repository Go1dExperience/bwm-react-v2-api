import { injectable } from "inversify";
import { User } from "../lib/db/models";
import { BaseRepository } from "./base.repository";

@injectable()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
