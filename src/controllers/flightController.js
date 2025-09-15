import { StatusCodes } from "http-status-codes";
import Services from "../services/index.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
const flightService = new Services.FlightService();

export const createFlight = asyncHandler(async (req, res) => {
  const flight = await flightService.createFlight({
    flightNumber: req.body.flightNumber,
    airplaneId: req.body.airplaneId,
    departureAirportId: req.body.departureAirportId,
    arrivalAirportId: req.body.arrivalAirportId,
    arrivalDate: new Date(req.body.arrivalDate),
    departureTime: new Date(req.body.departureTime),
    price: req.body.price,
    boardingDate: req.body.boardingDate,
    totalSeats: req.body.totalSeats,
  });

  sendSuccess(
    res,
    flight,
    "Successfully created a flight",
    StatusCodes.CREATED
  );
});


export const getFilteredFlights = asyncHandler(async (req, res) => {
  const { trips, minPrice, maxPrice, travellers, travelDate, sortBy, order } = req.query;

  const flights = await flightService.getFilteredFlights({
    trips,
    minPrice,
    maxPrice,
    travellers,
    travelDate,
    sortBy,
    order
  });

  sendSuccess(res, flights, "Successfully fetched filtered flights");
});
