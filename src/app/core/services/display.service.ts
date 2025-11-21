import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { SessionResponse } from '../../shared/models';
import { API_ENDPOINTS } from '../../shared/constants/api.constants';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class DisplayService {

  constructor(private http: HttpClient) {}

  getSession(id: string): Observable<SessionResponse | null> {
    return this.http.get<SessionResponse>(`${environment.apiBaseUrl}${API_ENDPOINTS.SESSION}/${id}`).pipe(
      catchError(() => of(null))
    );
  }
}