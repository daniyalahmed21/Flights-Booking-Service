import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import { BOOKING_STATUS } from "../utils/enum.js";

export class Booking extends Model {}

Booking.init(
  {
    flightId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM(...Object.values(BOOKING_STATUS)),
      defaultValue: BOOKING_STATUS.INITIATED,
      allowNull: false
    },
    noOfSeats: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    totalCost: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Booking",
    tableName: "Bookings",
    timestamps: true
  }
);

export default Booking;
