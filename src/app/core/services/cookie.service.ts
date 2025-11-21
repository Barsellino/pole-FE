import { Injectable } from '@angular/core';
import { COOKIE_KEYS } from '../../shared/constants/api.constants';

@Injectable({ providedIn: 'root' })
export class CookieService {

  set(name: string, value: string, days = 7): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  get(name: string): string | null {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))?.split('=')[1] || null;
  }

  delete(name: string): void {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  }

  getSessionId(): string | null {
    return this.get(COOKIE_KEYS.SESSION_ID);
  }

  setSessionId(sessionId: string): void {
    this.set(COOKIE_KEYS.SESSION_ID, sessionId);
  }
}