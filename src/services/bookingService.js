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
    try {
      const booking = await db.sequelize.transaction(async function BookingImp(
        t
      ) {
        const flight = await axios.get(
          `http://localhost:3000/api/v1/flights/${data.flightId}`
        );
        if (data.noOfSeats > flight.data.data.totalSeats) {
          throw new AppError(
            "Not enough seats available",
            StatusCodes.BAD_REQUEST
          );
        }
        const updatedSeats = flight.data.data.totalSeats - data.noOfSeats;
        await axios.patch(
          `http://localhost:3000/api/v1/flights/seats/${data.flightId}`,
          { seats: updatedSeats, dec: true }
        );
        console.log("After patch");

        // const booking = await this.bookingRepository.create(data, t);



        // return booking;
      });
    } catch (error) {
      if (error.name === "SequelizeForeignKeyConstraintError") {
        throw new AppError(
          "Provided userId or flightId does not exist",
          StatusCodes.BAD_REQUEST
        );
      }
      throw error;
    }
  }
}
