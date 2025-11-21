import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HostService {

  private readonly baseUrl = 'https://pole-be.onrender.com';

  constructor(private http: HttpClient) {}

  loadSession(id: string) {
    // GET https://pole-be.onrender.com/session/{id}
    return this.http.get(`${this.baseUrl}/session/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  createSession() {
    // POST https://pole-be.onrender.com/session
    return this.http.post<{ session_id: string }>(`${this.baseUrl}/session`, {});
  }
}
