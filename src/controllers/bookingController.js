import { StatusCodes } from "http-status-codes";
import Services from "../services/index.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";

const bookingService = new Services.BookingService();

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.createBooking({
    userId: req.body.userId,
    flightId: req.body.flightId,
    noOfSeats: req.body.noOfSeats || 1,
    bookingDate: req.body.bookingDate
      ? new Date(req.body.bookingDate)
      : new Date(),
  });

  sendSuccess(
    res,
    booking,
    "Successfully created a booking",
    StatusCodes.CREATED
  );
});

export const makePayment = asyncHandler(async (req, res) => {
  const { bookingId, amount, userId } = req.body;

  const paymentResult = await bookingService.makePayment({
    bookingId,
    amount,
    userId,
  });

  sendSuccess(res, paymentResult, "Payment processed successfully");
});

