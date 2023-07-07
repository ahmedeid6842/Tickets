import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;
  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this._client?.on("connect", () => {
        console.log("connected to NATS 📩");
        resolve();
      });

      this._client?.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper(); 
