import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";

const router = express.Router();

router.delete("/api/orders/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).send({ message: "No Ticket found" });
  }
  if (order.userId !== req.currentUser!.id) {
    return res
      .status(403)
      .send({ message: "un authorized to delete this order" });
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  res.status(204).send(order);
});

export { router as deleteOrderRouter };
