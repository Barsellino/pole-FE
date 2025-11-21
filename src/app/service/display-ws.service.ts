import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DisplayWSService {
  state = signal<any>(null);
  socket!: WebSocket;

  connect(sessionId: string) {
    this.socket = new WebSocket(`ws://localhost:8000/ws/display/${sessionId}`);

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'state') {
        this.state.set(msg.state);
      }
    };
  }
}
