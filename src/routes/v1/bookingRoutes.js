import Express from "express";
import { BookingController } from "../../controllers/index.js";

const bookingRouter = Express.Router();

bookingRouter.post("/", BookingController.createBooking);
// bookingRouter.get("/", BookingController.getAllBookings);
bookingRouter.post("/payment", BookingController.makePayment);

export default bookingRouter;
