import Booking from "../models/booking.js";
import CrudRepository from "./crudRepository.js";

export default class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  async get(bookingId, transaction) {
    return await Booking.findByPk(
      bookingId,
      transaction ? { transaction } : {}
    );
  }

  async update(bookingId, data, transaction) {
    return await Booking.update(data, {
      where: { id: bookingId },
      ...(transaction ? { transaction } : {}),
    });
  }
  
}
