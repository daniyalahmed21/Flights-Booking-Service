// import { Sequelize } from "sequelize";
// import Airplane from "../models/airplane.js";
// import Airport from "../models/airport.js";
// import Flight from "../models/flight.js";
// import CrudRepository from "./crudRepository.js";


// export default class FlightRepository extends CrudRepository {
//   constructor() {
//     super(Flight);
//   }

//   async getAllFlights(filter, order = []) {
//     console.log("Filter in repository:", filter);
//     console.log("Order in repository:", order);
//     return await Flight.findAll({
//       where: filter,
//       order: order,
//       include: [
//         {
//           model: Airport,
//           as: "departureAirport",
//           on: Sequelize.where(
//             Sequelize.col("departureAirport.code"), 
//             "=",
//             Sequelize.col("Flight.departureAirportId") 
//           )
//         },
//         {
//           model: Airport,
//           as: "arrivalAirport",
//           on: Sequelize.where(
//             Sequelize.col("arrivalAirport.code"),
//             "=",
//             Sequelize.col("Flight.arrivalAirportId")
//           )
//         },
//         {
//           model: Airplane,
//           as: "airplane"
//         }
//       ],
      
      
//     });

//   }
  
// }
