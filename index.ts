import "reflect-metadata";
import "dotenv/config";

import cors from "cors";
import express from "express";
import morgan from "morgan";

import bookingRoutes from "./api/booking/booking.route";
import userRoutes from "./api/user/user.route";
import { User } from "./lib/db/models";
import { errorHandler } from "./middlewares/errorHandler";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Adjust type as necessary
    }
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cors());
app.use(errorHandler);

app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
