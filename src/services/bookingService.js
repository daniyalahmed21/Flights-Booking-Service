import AppError from "../utils/errors/appError.js";
import { StatusCodes } from "http-status-codes";
import Repositories from "../repositories/index.js";
import db from "../models/index.js";
import axios from "axios";

export default class BookingService {
  constructor() {
    this.bookingRepository = new Repositories.BookingRepository();
  }

  async createBooking(data) {
    const transaction = await db.sequelize.transaction();
    try {
      const flight = await axios.get(`http://localhost:3000/api/v1/flights/${data.flightId}`);
      
      if (data.noOfSeats > flight.data.data.totalSeats) {
        throw new AppError("Not enough seats available", StatusCodes.BAD_REQUEST);
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
        throw new AppError("Provided userId or flightId does not exist", StatusCodes.BAD_REQUEST);
      }
      throw error;
    }
  }
  
}
