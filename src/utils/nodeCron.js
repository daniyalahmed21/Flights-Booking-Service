import cron from "node-cron";
import Services from "../services/index.js";
const bookingService = new Services.BookingService();

export function scheduleTask() {
//   cron.schedule("*/5 * * * * *", () => {
//     bookingService.cancelOldBookings();
//   });
}
