import Express from "express";
import airplaneRouter from "./airplaneRoutes.js";
import cityRouter from "./cityRoutes.js";
import airportRouter from "./airportRoutes.js";
import flightRouter from "./flightRoutes.js";

const v1Router = Express.Router();

// v1Router.use("/airplanes", airplaneRouter);
// v1Router.use("/cities", cityRouter);
// v1Router.use("/airports", airportRouter);
// v1Router.use("/flights", flightRouter);

export default v1Router;
