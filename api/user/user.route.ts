import { Router } from "express";
import container from "../../inversify.config";
import { UserController } from "./user.controller";
import TYPES from "../../types/DI";

const router = Router();
const userController = container.get<UserController>(TYPES.UserController);

router.get(
  "/:userId/rentals",
  userController.findUserRentals.bind(userController)
);

export default router;