// import AppError from "../utils/errors/appError.js";
// import { StatusCodes } from "http-status-codes";
// import Repositories from "../repositories/index.js";
// import { Op } from "sequelize";

// export default class FlightService {
//   constructor() {
//     this.flightRepository = new Repositories.FlightRepository();
//   }

//   async createFlight(data) {
//     return await this.flightRepository.create(data);
//   }

//   async getFlights() {
//     return await this.flightRepository.getAll();
//   }

//   async getFilteredFlights(filterData) {
//     let customFilter = {};
//     const { trips, minPrice, maxPrice, travellers, travelDate, sortBy, order } =
//       filterData;

//     if (trips) {
//       const [departureAirportId, arrivalAirportId] = trips.split("-");
//       customFilter.departureAirportId = departureAirportId;
//       customFilter.arrivalAirportId = arrivalAirportId;
//     }

//     if (minPrice) customFilter.price = { [Op.gte]: minPrice };
//     if (maxPrice)
//       customFilter.price = { ...customFilter.price, [Op.lte]: maxPrice };
//     const travelDateStart = new Date(`${filterData.travelDate}T00:00:00`);
//     const travelDateEnd = new Date(`${filterData.travelDate}T23:59:59`);

//     customFilter.departureTime = {
//       [Op.gte]: travelDateStart,
//       [Op.lte]: travelDateEnd,
//     };
//     if (travellers) customFilter.totalSeats = { [Op.gte]: travellers };

//     const sortField = sortBy || "departureTime"; // default sort field
//     const sortOrder = order || "ASC"; // default order

//     return await this.flightRepository.getAllFlights(customFilter, [
//       [sortField, sortOrder],
//     ]);
//   }

//   async getFlight(id) {
//     const flight = await this.flightRepository.get(id);
//     if (!flight) {
//       throw new AppError(
//         `Flight with id ${id} not found`,
//         StatusCodes.NOT_FOUND
//       );
//     }
//     return flight;
//   }

//   async updateFlight(id, data) {
//     const [updated] = await this.flightRepository.update(id, data);
//     if (!updated) {
//       throw new AppError(
//         `Flight with id ${id} not found`,
//         StatusCodes.NOT_FOUND
//       );
//     }
//     return updated;
//   }

//   async deleteFlight(id) {
//     const deleted = await this.flightRepository.destroy(id);
//     if (!deleted) {
//       throw new AppError(
//         `Flight with id ${id} not found`,
//         StatusCodes.NOT_FOUND
//       );
//     }
//     return true;
//   }
// }
