import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection close");
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("accounting-srv");

  const subsciption = stan.subscribe(
    "ticket:created",
    "listener-queue-group",
    options
  );

  subsciption.on("message", (message: Message) => {
    const data = message.getData();

    if (typeof data == "string") {
      console.log(
        `Received Event #${message.getSequence()}, with data: ${data}`
      );
    }
    message.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
