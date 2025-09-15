import AppError from "../utils/errors/appError.js";
import logger from "../config/loggerConfig.js";

export default function errorHandler(err, req, res, next) {
  logger.error(err.stack);

  // Handle Sequelize Validation Error
  if (err.name === "SequelizeValidationError") {
    const explanation = err.errors.map((e) => e.message);
    err = new AppError("Validation failed", 400, explanation);
  }

  // Handle Sequelize Unique Constraint Error
  if (err.name === "SequelizeUniqueConstraintError") {
    const explanation = err.errors.map((e) => e.message);
    err = new AppError("Duplicate entry", 409, explanation);
  }

  // Default fallback
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    status: false,
    data: {},
    message: err.message,
    error: {
      explanation: err.explanation || [err.message],
    },
  });
}
