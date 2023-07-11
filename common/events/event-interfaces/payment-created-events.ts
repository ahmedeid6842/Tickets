import { Subjects } from "../subjects";

export interface PaymentCreateEvent {
  subject: Subjects.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
