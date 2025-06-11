import { Router } from "express";
import container from "../../inversify.config";
import { UserController } from "./user.controller";

const router = Router();
const userController = container.get<UserController>("UserController");
router.get("/:userId/rentals", (req, res) => userController.findUserRentals(req, res));