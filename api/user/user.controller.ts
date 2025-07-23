import { Request, Response } from "express";
import { inject, injectable } from "inversify";

import TYPES from "../../types/DI";
import { createSuccessResponse } from "../../utils/apiResponse";
import { UserService } from "./user.service";
import { StatusCodes } from "http-status-codes";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService
  ) {}
  findUserRentals = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const rentals = await this.userService.findRentalForUser(userId);
    res
      .status(StatusCodes.OK)
      .send(
        createSuccessResponse(rentals, "User rentals retrieved successfully")
      );
  };
}
