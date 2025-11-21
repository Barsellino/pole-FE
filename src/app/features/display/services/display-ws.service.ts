import { Injectable, signal } from '@angular/core';
import { GameState, WSMessage } from '../../../shared/models';
import { WS_ENDPOINTS } from '../../../shared/constants/api.constants';
import { environment } from '../../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class DisplayWSService {
  state = signal<GameState | null>(null);
  private socket?: WebSocket;

  connect(sessionId: string): void {
    const wsUrl = `${environment.wsBaseUrl}${WS_ENDPOINTS.DISPLAY}/${sessionId}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onmessage = (event) => {
      try {
        const msg: WSMessage = JSON.parse(event.data);
        if (msg.type === 'state' && msg.state) {
          this.state.set(msg.state);
        }
      } catch (error) {
        console.error('WS Display message parse error:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WS Display error:', error);
    };
  }

  disconnect(): void {
    this.socket?.close();
  }
}