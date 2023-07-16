import express, { Request, Response } from "express";
import { OrderStatus } from "@aetickets/common";
import { requireAuth } from "../middleware/requireAuth";
import { Order } from "../models/order";
import { stripe } from "../stripe";
import { Payment } from "../models/payment";
import { PaymentCreatePublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post("/api/payments",requireAuth, async (req: Request, res: Response) => {
  const { token, orderId } = req.body;
  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).send({ message: "No Ticket found" });
  }

  if (order.userId !== req.currentUser!.userId) {
    return res.status(403).send({ message: "un authorized to get this order" });
  }

  if (order.status === OrderStatus.Cancelled) {
    return res
      .status(400)
      .send({ message: "Payment cannot be made for a cancelled order." });
  }

  // const paymentStripeInfo = await stripe.charges.create({
  //   currency: "usd",
  //   amount: order.price * 100,
  //   source: token,
  // });

  const payment = Payment.build({
    orderId,
    stripeId: "skcfjuerhf45dadf3d" // this random string for testing purpose
    // stripeId: paymentStripeInfo.id,
  });

  new PaymentCreatePublisher(natsWrapper.client).publish({
    id: payment.id,
    orderId: payment.orderId,
    stripeId: payment.stripeId,
  });

  return res.send({
    success: true,
    message: "Your purchase successed!",
    paymentId: payment.id,
  });
});

export { router as createPaymentRouter };
