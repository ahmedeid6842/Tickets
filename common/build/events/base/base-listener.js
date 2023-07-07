"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(cilent) {
        this.cilent = cilent;
        this.ackWait = 5 * 1000; // 5 seconds
    }
    subscriptionOptions() {
        return this.cilent
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }
    listen() {
        const subsciption = this.cilent.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subsciption.on("message", (msg) => {
            console.log(`Message Received : ${this.subject} / ${this.queueGroupName}`);
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }
    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === "string"
            ? JSON.parse(data)
            : JSON.parse(data.toString("utf-8"));
    }
}
exports.Listener = Listener;
