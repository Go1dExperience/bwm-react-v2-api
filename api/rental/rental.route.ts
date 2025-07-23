import { Router } from "express";

import container from "../../inversify.config";
import { RouterConfig } from "../../types";
import TYPES from "../../types/DI";
import { RentalController } from "./rental.controller";

export class RentalRoutes implements RouterConfig {
  public path = "/rentals";
  public router = Router();
  private rentalController: RentalController;

  constructor() {
    this.rentalController = container.get<RentalController>(
      TYPES.RentalController
    );
    this.initRoutes();
  }

  public initRoutes(): void {}
}
