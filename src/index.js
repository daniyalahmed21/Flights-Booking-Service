import Express from "express";
import { SERVER_CONFIG } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
import Middlewares from "./middlewares/index.js";
import { sequelize } from "./config/sequelize.js";
import { scheduleTask } from "./utils/nodeCron.js";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use(Middlewares.errorHandler);

app.listen(SERVER_CONFIG.PORT, async () => {
  console.log(`Server running on port ${SERVER_CONFIG.PORT}`);
  // await sequelize.sync({ alter: true }); // or { force: false }
  console.log("✅ Database synced");
  scheduleTask();

});
