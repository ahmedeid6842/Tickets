import express, { Request, Response } from "express";
import { Order } from "../models/order";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) {
      return res.status(404).send({ message: "No order found" });
    }

    if (order.userId !== req.currentUser!.id) {
      return res
        .status(403)
        .send({ message: "un authorized to get this order" });
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
