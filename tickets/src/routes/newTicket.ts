import express, { Request, Response } from "express";
import { Ticket } from "../models/tickets";
import { requireAuth } from "../middleware/requireAuth";
import {TicketCreatedPublisher} from "../events/publishers/tikcet-created-publisher";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    // new TicketCreatedPublisher(client).publish({
    //   id:ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId
    // })

    return res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
