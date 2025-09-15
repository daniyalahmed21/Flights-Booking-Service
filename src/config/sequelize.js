import { Sequelize } from "sequelize";
import { SERVER_CONFIG } from "./serverConfig.js";

export const sequelize = new Sequelize(
  SERVER_CONFIG.DB.NAME,
  SERVER_CONFIG.DB.USER,
  SERVER_CONFIG.DB.PASS,
  {
    host: SERVER_CONFIG.DB.HOST,
    dialect: SERVER_CONFIG.DB.DIALECT,
    logging: false,
  }
);

// Test connection (optional)
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
})();
