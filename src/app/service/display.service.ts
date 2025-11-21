import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DisplayService {


  private readonly baseUrl = 'https://pole-be.onrender.com';

  constructor(private http: HttpClient) {}

  getSession(id: string) {
    return this.http.get(`${this.baseUrl}/session/${id}`).pipe(
      catchError(() => of(null))
    );
  }
}
