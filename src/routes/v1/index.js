import Express from "express";
import bookingRouter from "./bookingRoutes.js";
import { info } from "../../controllers/infoController.js";
const v1Router = Express.Router();

v1Router.use("/bookings", bookingRouter);
v1Router.get("/info", info);
export default v1Router;
