import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@aetickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
