import express, { Request, Response } from "express";
import { Ticket } from "../models/tickets";
import { requireAuth } from "../middleware/requireAuth";
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
    return res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
