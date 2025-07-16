import { Router } from "express";
import container from "../../inversify.config";
import { UserController } from "./user.controller";

const router = Router();
const userController = container.get<UserController>("UserController");
