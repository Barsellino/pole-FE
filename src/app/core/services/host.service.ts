import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { SessionResponse, CreateSessionResponse } from '../../shared/models';
import { API_ENDPOINTS } from '../../shared/constants/api.constants';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HostService {

  constructor(private http: HttpClient) {}

  loadSession(id: string): Observable<SessionResponse | null> {
    return this.http.get<SessionResponse>(`${environment.apiBaseUrl}${API_ENDPOINTS.SESSION}/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  createSession(): Observable<CreateSessionResponse> {
    return this.http.post<CreateSessionResponse>(`${environment.apiBaseUrl}${API_ENDPOINTS.SESSION}`, {});
  }
}