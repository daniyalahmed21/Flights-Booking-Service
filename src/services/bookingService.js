import AppError from "../utils/errors/appError.js";
import { StatusCodes } from "http-status-codes";
import Repositories from "../repositories/index.js";
import db from "../models/index.js";
import axios from "axios";
import { BOOKING_STATUS } from "../utils/enum.js";

export default class BookingService {
  constructor() {
    this.bookingRepository = new Repositories.BookingRepository();
  }

  async createBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const flight = await axios.get(
        `http://localhost:3000/api/v1/flights/${data.flightId}`
      );

      if (data.noOfSeats > flight.data.data.totalSeats) {
        throw new AppError(
          "Not enough seats available",
          StatusCodes.BAD_REQUEST
        );
      }

      const billingAmount = flight.data.data.price * data.noOfSeats;

      // Create booking inside transaction
      const booking = await this.bookingRepository.create(
        { ...data, totalCost: billingAmount },
        transaction
      );

      // Update seats via API
      await axios.patch(
        `http://localhost:3000/api/v1/flights/seats/${data.flightId}`,
        { seats: data.noOfSeats, dec: true }
      );

      await transaction.commit();
      return booking;
    } catch (error) {
      await transaction.rollback();
      if (error.name === "SequelizeForeignKeyConstraintError") {
        throw new AppError(
          "Provided userId or flightId does not exist",
          StatusCodes.BAD_REQUEST
        );
      }
      throw error;
    }
  }

  async makePayment(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const { bookingId, amount, userId } = data;
  
      const booking = await this.bookingRepository.get(bookingId, transaction);
      if (!booking) {
        throw new AppError("Booking not found", StatusCodes.NOT_FOUND);
      }
  
      if (booking.userId !== userId) {
        throw new AppError("Unauthorized payment attempt", StatusCodes.UNAUTHORIZED);
      }
  
      if (booking.status === BOOKING_STATUS.BOOKED) {
        throw new AppError("Booking is already completed", StatusCodes.BAD_REQUEST);
      }
  
      if (amount < booking.totalCost) {
        throw new AppError("Insufficient payment amount", StatusCodes.BAD_REQUEST);
      }
  
      // update booking status
      await this.bookingRepository.update(
        bookingId,
        { status: BOOKING_STATUS.BOOKED },
        transaction // pass transaction only
      );
  
      await transaction.commit();
  
      // ✅ use only defined variables
      return {
        status: "success",
        bookingId,
        message: "Payment completed successfully"
      };
    } catch (error) {
      await transaction.rollback();
      console.error("Payment error:", error);
      throw error;
    }
  }
  
}
