import express, { Request, Response } from "express";
import { Ticket } from "../models/tickets";
import { requireAuth } from "../middleware/requireAuth";
import { TicketCreatedPublisher } from "../events/publishers/tikcet-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.userId,
    });

    await ticket.save();

    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    return res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
