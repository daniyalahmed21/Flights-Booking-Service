import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, printf } = format;

// Define custom log format
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create logger instance
const logger = createLogger({
  format: combine(
    label({ label: "MyApp" }), // you can change "MyApp" to your project/service name
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" })
  ]
});

export default logger;
