import { StatusCodes } from "http-status-codes";
import Services from "../services/index.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";

const bookingService = new Services.BookingService();
const inMemDb = {};

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
   const idempotencyKey = req.headers["idempotency-key"];
  if (!idempotencyKey) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Idempotency key is required" });
  }
  if(inMemDb[idempotencyKey]){
    return res
      .status(StatusCodes.OK)
      .json({ message: "Payment already processed" });
  }

  const { bookingId, amount, userId } = req.body;

  const paymentResult = await bookingService.makePayment({
    bookingId,
    amount,
    userId,
  });

  inMemDb[idempotencyKey] = idempotencyKey; 

  sendSuccess(res, paymentResult, "Payment processed successfully");
});

