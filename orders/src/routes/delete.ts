import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";
import { OrderCancelledPublisher } from "../events/publisher/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";

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

  //publish the order is cancelled using natsWrapper
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    ticket: {
      id: order.ticket.id,
    },
  });

  res.status(204).send(order);
});

export { router as deleteOrderRouter };
