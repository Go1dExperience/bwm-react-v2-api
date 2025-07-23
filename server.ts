import cors from "cors";
import express from "express";
import morgan from "morgan";

import { AuthRoutes } from "./api/auth/auth.route";
import { BookingRoutes } from "./api/booking/booking.route";
import { RentalRoutes } from "./api/rental/rental.route";
import { UserRoutes } from "./api/user/user.route";
import App from "./app";
import { errorHandler } from "./middlewares/errorHandler";

const app = new App({
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  middlewares: [
    express.json(),
    express.urlencoded({ extended: true }),
    morgan("combined"),
    cors(),
    // @ts-ignore
    errorHandler,
  ],
  routers: [
    new UserRoutes(),
    new RentalRoutes(),
    new BookingRoutes(),
    new AuthRoutes(),
  ],
});

app.listen(() => {
  console.log(`Server is running on port ${app.port}`);
});
