import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HostService {

  constructor(private http: HttpClient) {}

  loadSession(id: string) {
    return this.http.get(`/session/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  createSession() {
    return this.http.post<{ session_id: string }>(`/session`, {});
  }
}
