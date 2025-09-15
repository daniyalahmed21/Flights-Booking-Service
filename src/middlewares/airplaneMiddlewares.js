import { StatusCodes } from "http-status-codes";

export const validateAirplaneData = (req, res, next) => {
  const { modelNumber, capacity } = req.body;

  if (!modelNumber || typeof modelNumber !== "string") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      data: {},
      message: "Invalid or missing airplane model",
      error: { explanation: "Model number is required and should be a string" },
    });
  }

  if (!capacity || typeof capacity !== "number" || capacity <= 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "false",
      data: {},
      message: "Invalid or missing airplane capacity",
      error: {
        explanation: "Capacity is required and should be a positive number",
      },
    });
  }

  next();
};
