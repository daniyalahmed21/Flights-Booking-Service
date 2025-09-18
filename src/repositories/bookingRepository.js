import { Sequelize } from "sequelize";
import Booking from "../models/booking.js";
import CrudRepository from "./crudRepository.js";

export default class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  
}
