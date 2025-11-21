export interface SessionResponse {
  id: string;
  session_id: string;
  state?: GameState;
  error?: string;
}

export interface CreateSessionResponse {
  session_id: string;
}

export interface GameState {
  topic?: string;
  activePlayer?: 'A' | 'B';
  timeA: number;
  timeB: number;
  running: boolean;
  images?: { src: string; alt: string }[];
  imageIndex: number;
}

export interface WSMessage {
  type: 'state' | 'command';
  state?: GameState;
  command?: string;
  payload?: any;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}