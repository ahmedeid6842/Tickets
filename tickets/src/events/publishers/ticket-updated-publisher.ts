import { Publisher, Subjects, TicketUpdatedEvent } from '@aetickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject: Subjects.TicketUpdate = Subjects.TicketUpdate;
}
