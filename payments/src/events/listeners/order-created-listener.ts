import { Message } from "node-nats-streaming";
import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@aetickets/common";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message): Promise<void> {
    const order = Order.build({
      id: data.id,
      version: data.version,
      userId: data.userId,
      price: data.ticket.price,
      status: data.status,
    });

    await order.save();

    msg.ack();
  }
}
