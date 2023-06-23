import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const subsciption = stan.subscribe("ticket:created", "listern-queue-group");

  subsciption.on("message", (message: Message) => {
    const data = message.getData();

    if (typeof data == "string") {
      console.log(
        `Received Event #${message.getSequence()}, with data: ${data}`
      );
    }
  });
});
