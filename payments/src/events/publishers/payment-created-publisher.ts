import { Publisher, PaymentCreateEvent, Subjects } from "@aetickets/common";

export class PaymentCreatePublisher extends Publisher<PaymentCreateEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
