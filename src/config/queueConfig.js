import amqp from "amqplib";

let channel, connection;

async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();
    await channel.assertQueue("notifications");

  } catch (error) {
    console.error("Error connecting to the queue service:", error);
  }
}

async function sendToQueue(Data) {
  if (!channel) {
    console.error("Channel is not established. Call connectQueue() first.");
    return;
  }
  channel.sendToQueue("notifications", Buffer.from(JSON.stringify(Data)));
}

export { connectQueue, sendToQueue };
