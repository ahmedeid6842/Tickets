import express, { Request, Response } from "express";
import { Ticket } from "../models/tickets";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).send({ message: "ticket not found" });
  }

  if (ticket.userId !== req.currentUser!.userId) {
    return res
      .status(403)
      .send({ message: "un authorized to edit this ticket" });
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price,
  });
  await ticket.save();
  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
  });
  res.send(ticket);
});

export { router as updateTicketRouter };
