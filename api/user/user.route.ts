import { Router } from "express";

import container from "../../inversify.config";
import { RouterConfig } from "../../types";
import TYPES from "../../types/DI";
import { UserController } from "./user.controller";
export class UserRoutes implements RouterConfig {
  public path = "/users";
  public router = Router();
  private userController: UserController;

  constructor() {
    this.userController = container.get<UserController>(TYPES.UserController);
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(
      "/:userId/rentals",
      this.userController.findUserRentals.bind(this.userController)
    );
  }
}
