export enum OrderStatus {
  // Order created, ticket not reserved
  Created = "created",

  // Ticket already reserved, or order cancelled
  // Order expires before payment
  Cancelled = "cancelled",

  // Ticket reserved, awaiting payment
  AwaitingPayment = "awaiting:payment",

  // Ticket reserved and payment provided
  Complete = "complete",
}
