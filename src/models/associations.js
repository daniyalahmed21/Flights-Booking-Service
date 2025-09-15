// import Airplane from "./airplane.js";
// import Airport from "./airport.js";
// import Flight from "./flight.js";
// import Seat from "./seat.js";

// Airplane.hasMany(Flight, { foreignKey: "airplaneId", as: "flights" });
// Flight.belongsTo(Airplane, { foreignKey: "airplaneId", as: "airplane" });

// Airport.hasMany(Flight, { foreignKey: "departureAirportId", as: "departingFlights" });
// Flight.belongsTo(Airport, { foreignKey: "departureAirportId", as: "departureAirport" });

// Airport.hasMany(Flight, { foreignKey: "arrivalAirportId", as: "arrivingFlights" });
// Flight.belongsTo(Airport, { foreignKey: "arrivalAirportId", as: "arrivalAirport" });

// Seat.belongsTo(Airplane,{foreignKey : "airplaneId" , as : "airplane"});
// Airplane.hasMany(Seat,{foreignKey : "airplaneId" , as : "seats"});