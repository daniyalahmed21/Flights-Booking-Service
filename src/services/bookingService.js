import AppError from "../utils/errors/appError.js";
import { StatusCodes } from "http-status-codes";
import Repositories from "../repositories/index.js";
import db from "../models/index.js";
import axios from "axios";
import { BOOKING_STATUS } from "../utils/enum.js";
import { sendToQueue } from "../config/queueConfig.js";

export default class BookingService {
  constructor() {
    this.bookingRepository = new Repositories.BookingRepository();
  }

  /** ---------------- CREATE BOOKING ---------------- */
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

  /** ---------------- MAKE PAYMENT ---------------- */
  async makePayment(data) {
   
    const { bookingId, amount, userId } = data;

    // 1. Fetch booking first (no transaction yet)
    const booking = await this.bookingRepository.get(bookingId);
    if (!booking) {
      throw new AppError("Booking not found", StatusCodes.NOT_FOUND);
    }

    // 2. Check expiry before starting transaction
    const currentTime = new Date();
    const bookingTime = new Date(booking.createdAt);
    const timeDifference = (currentTime - bookingTime) / (1000 * 60); // minutes
    if (timeDifference > 30) {
      // cancelBooking has its own transaction
      await this.cancelBooking(bookingId);
      throw new AppError("Booking has expired", StatusCodes.BAD_REQUEST);
    }

    // 3. Other checks before starting transaction
    if (booking.userId !== userId) {
      throw new AppError(
        "Unauthorized payment attempt",
        StatusCodes.UNAUTHORIZED
      );
    }

    if (booking.status === BOOKING_STATUS.BOOKED) {
      throw new AppError(
        "Booking is already completed",
        StatusCodes.BAD_REQUEST
      );
    }

    if (amount < booking.totalCost) {
      throw new AppError(
        "Insufficient payment amount",
        StatusCodes.BAD_REQUEST
      );
    }

    // 4. Now open transaction to update status
    const transaction = await db.sequelize.transaction();
    try {
      await this.bookingRepository.update(
        bookingId,
        { status: BOOKING_STATUS.BOOKED },
        transaction
      );

      sendToQueue({
        text: `Payment completed successfully for booking ID: ${bookingId}`,
        subject: "Payment Successful",
        recipientEmail: "daniyalahmedd25@gmail.com"
      });
      await transaction.commit();
      
      return {
        status: "success",
        bookingId,
        message: "Payment completed successfully",
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /** ---------------- CANCEL BOOKING ---------------- */
  async cancelBooking(bookingId) {
    const transaction = await db.sequelize.transaction();
    try {
      const booking = await this.bookingRepository.get(bookingId, transaction);
      if (!booking) {
        throw new AppError("Booking not found", StatusCodes.NOT_FOUND);
      }

      if (booking.status === BOOKING_STATUS.CANCELLED) {
        await transaction.commit();
        return;
      }

      // give seats back to flight
      await axios.patch(
        `http://localhost:3000/api/v1/flights/seats/${booking.flightId}`,
        { seats: booking.noOfSeats, dec: false }
      );

      // update status
      await this.bookingRepository.update(
        bookingId,
        { status: BOOKING_STATUS.CANCELLED },
        transaction
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /** ---------------- CANCEL OLD BOOKINGS ---------------- */
  async cancelOldBookings() {
    const timeStamp = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago
    const oldBookings = await this.bookingRepository.cancelOldBookings(timeStamp);

    for (const booking of oldBookings) {
      if (booking.status !== BOOKING_STATUS.BOOKED) {
        await this.cancelBooking(booking.id);
      }
    }
  }
}
