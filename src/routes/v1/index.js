import Express from "express";
import bookingRouter from "./bookingRoutes.js";

const v1Router = Express.Router();

v1Router.use("/bookings", bookingRouter);

export default v1Router;
