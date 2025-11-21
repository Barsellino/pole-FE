import { Injectable, signal } from '@angular/core';
import { GameState, WSMessage } from '../../../shared/models';
import { WS_ENDPOINTS } from '../../../shared/constants/api.constants';
import { environment } from '../../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HostWSService {
  private socket?: WebSocket;
  private _state = signal<GameState | null>(null);
  state = this._state;

  connect(sessionId: string): void {
    const wsUrl = `${environment.wsBaseUrl}${WS_ENDPOINTS.HOST}/${sessionId}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WS HOST connected');
    };

    this.socket.onmessage = (event) => {
      try {
        const msg: WSMessage = JSON.parse(event.data);
        if (msg.type === 'state' && msg.state) {
          this._state.set(msg.state);
        }
      } catch (error) {
        console.error('WS Host message parse error:', error);
      }
    };

    this.socket.onerror = (error) => {
      console.error('WS HOST error:', error);
    };

    this.socket.onclose = () => {
      console.warn('WS HOST closed');
    };
  }

  sendCommand(command: string, payload: Record<string, any> = {}): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected');
      return;
    }

    const message: WSMessage = {
      type: 'command',
      command,
      payload
    };

    this.socket.send(JSON.stringify(message));
  }

  sendSetTopicId(topicId: string): void {
    this.sendCommand('set_topic', { topic_id: topicId });
  }

  disconnect(): void {
    this.socket?.close();
  }
}