import nats, { Message } from "node-nats-streaming";

console.clear();

const stan = nats.connect("ticketing", "123", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const subsciption = stan.subscribe("ticket:created");

  subsciption.on("message", (message: Message) => {
    const data = message.getData();

    if (typeof data == "string") {
      console.log(`Received Event #${message.getSequence()}, with data: ${data}`);
    }
  });
});

