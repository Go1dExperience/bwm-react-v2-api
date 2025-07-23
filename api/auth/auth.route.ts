import express from "express";

import container from "../../inversify.config";
import { RouterConfig } from "../../types";
import TYPES from "../../types/DI";
import { AuthController } from "./auth.controller";

export class AuthRoutes implements RouterConfig {
  public path = "/auth";
  public router = express.Router();
  private authController: AuthController;

  constructor() {
    this.authController = container.get<AuthController>(TYPES.AuthController);
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      "/signup",
      this.authController.signUp.bind(this.authController)
    );
    this.router.post(
      "/signin",
      this.authController.signIn.bind(this.authController)
    );
  }
}
