import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HostWSService {
  private socket!: WebSocket;

  private _state = signal<any>(null);
  state = this._state;

  connect(sessionId: string) {
    this.socket = new WebSocket(`ws://localhost:8000/ws/host/${sessionId}`);

    this.socket.onopen = () => {
      console.log("WS HOST connected");
    };

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'state') {
        this._state.set(msg.state);
      }
    };

    this.socket.onerror = (err) => {
      console.error("WS HOST error", err);
    };

    this.socket.onclose = () => {
      console.warn("WS HOST closed");
    };
  }

  // ---------------------
  // Відправка команд гри
  // ---------------------

  sendCommand(command: string, payload: object = {}) {
    this.socket?.send(JSON.stringify({
      type: "command",
      command,
      payload
    }));
  }

  // ---------------------
  // Відправка тільки topic_id
  // ---------------------

  sendSetTopicId(topicId: string) {
    this.sendCommand("set_topic", { topic_id: topicId });
  }
}
