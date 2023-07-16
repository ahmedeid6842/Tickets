import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";
import { OrderCancelledPublisher } from "../events/publisher/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.delete("/api/orders/:orderId",requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).send({ message: "No Order found" });
  }
  if (order.userId !== req.currentUser!.userId) {
    return res
      .status(403)
      .send({ message: "un authorized to delete this order" });
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  //publish the order is cancelled using natsWrapper
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
    },
  });

  res.status(204).send(order);
});

export { router as deleteOrderRouter };
