import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DisplayService {

  constructor(private http: HttpClient) {}

  getSession(id: string) {
    return this.http.get(`/session/${id}`).pipe(
      catchError(() => of(null))
    );
  }
}
