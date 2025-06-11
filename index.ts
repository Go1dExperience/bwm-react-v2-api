import "reflect-metadata";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import container from "./inversify.config";
import TYPES from "./types/DI";
import { UserController } from "./api/user/user.controller";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cors());

const userController = container.get<UserController>(TYPES.UserController);

const testFunc = (req: Express.Request, res: express.Response) => {
  res.status(200).json({
    message: "Hello, World!",
  });
}
app.get("/", testFunc);

app.get("/users/:userId/rentals", userController.findUserRentals);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on sport ${PORT}`);
});
