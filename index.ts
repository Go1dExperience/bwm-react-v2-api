import "reflect-metadata";
import "dotenv/config";

import cors from "cors";
import express from "express";
import morgan from "morgan";

import userRoutes from "./api/user/user.route";
import bookingRoutes from "./api/booking/booking.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cors());

app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
