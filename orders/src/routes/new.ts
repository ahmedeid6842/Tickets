import express, { Request, Response } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { Ticket } from "../models/ticket";
import { Order, OrderStatus } from "../models/order";

const router = express.Router();

router.post("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const { ticketId } = req.body;

  // check if the ticket is already exist or not
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    return res.status(404).send("No Ticket found");
  }

  // check if the ticket is already reserved 
  const isReserved = await ticket.isReserved();
  if (isReserved) {
    return res.status(400).send("Ticket is already reserved");
  }

  // set the expiration date for the ticket
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + 15 * 60);

  // Build the ticket order 
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket,
  });
  await order.save();

  res.status(201).send(order);
});

export { router as newOrderRouter };
