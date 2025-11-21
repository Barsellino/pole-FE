import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CookieService {

  set(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  get(name: string): string | null {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))?.split('=')[1] || null;
  }

  delete(name: string) {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  }
}
