import { StatusCodes } from "http-status-codes";

export const info = (req, res) => {
  res.status(StatusCodes.OK).json({
    status: "success",
    data: {},
    message: "API is working",
    error: {},
  });
};
