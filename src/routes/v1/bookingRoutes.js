import Express from "express";
import { BookingController } from "../../controllers/index.js";

const bookingRouter = Express.Router();

bookingRouter.post("/", BookingController.createBooking);
// bookingRouter.get("/", BookingController.getAllBookings);

export default bookingRouter;
