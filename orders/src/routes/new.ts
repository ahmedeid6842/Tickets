import express, { Request, Response } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { Ticket } from "../models/ticket";
import { Order, OrderStatus } from "../models/order";
import { OrderCreatedPublisher } from "../events/publisher/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const { ticketId } = req.body;

  // check if the ticket is already exist or not
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    return res.status(404).send({ message: "No Ticket found" });
  }

  // check if the ticket is already reserved
  const isReserved = await ticket.isReserved();
  if (isReserved) {
    return res.status(400).send({ message: "Ticket is already reserved" });
  }

  // set the expiration date for the ticket
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + 15 * 60);

  // Build the ticket order
  const order = Order.build({
    userId: req.currentUser!.userId,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket,
  });
  await order.save();

  //publish created event
  new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    status: order.status,
    version: order.version,
    userId: order.userId,
    expiresAt: order.expiresAt.toISOString(),
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  });
  
  res.status(201).send(order);
});

export { router as newOrderRouter };
