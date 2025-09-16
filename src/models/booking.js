import { Model, DataTypes } from "sequelize";
import { BOOKING_STATUS } from "../utils/enum.js";
const { BOOKED, CANCELLED, INITIATED, PENDING } = BOOKING_STATUS;

export default (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      // define associations here if needed
      // Example:
      // Booking.belongsTo(models.Flight, { foreignKey: 'flightId', as: 'flight' });
      // Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Booking.init(
    {
      flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: [BOOKED, CANCELLED, INITIATED, PENDING],
        defaultValue: BOOKING_STATUS.INITIATED,
        allowNull: false,
      },
      noOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      totalCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: "Bookings", // optional, but explicit
      timestamps: true,
    }
  );

  return Booking;
};
