import dotenv from "dotenv";
dotenv.config();

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  
  DB: {
    NAME: process.env.DB_NAME || "Flights",
    USER: process.env.DB_USER || "root",
    PASS: process.env.DB_PASS || "",
    HOST: process.env.DB_HOST || "localhost",
    DIALECT: process.env.DB_DIALECT || "mysql"
  }
};
