import { inject, injectable } from "inversify";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import TYPES from "../../types/DI";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService
  ) {}
  findUserRentals = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const rentals = await this.userService.findRentalForUser(userId);
    res.status(200).json({
      data: rentals,
    });
  };
}
