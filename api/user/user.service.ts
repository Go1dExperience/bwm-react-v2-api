import { Rental } from "../../lib/db/models";
import TYPES from "../../types/DI";
import { UserRepository } from "./../../repositories/user.repository";
import { injectable, inject } from "inversify";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository
  ) {}
  findRentalForUser(userId: string) {
    return this.userRepository.findAll({
      where: {
        id: userId,
      },
      include: {
        model: Rental,
        as: "rentals",
      },
    });
  }
}
