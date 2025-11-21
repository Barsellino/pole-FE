import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Topic {
  id: string;
  name: string;
  images?: { src: string; alt: string }[];
}

@Injectable({ providedIn: 'root' })
export class TopicsService {

  private readonly baseUrl = 'https://pole-be.onrender.com';

  constructor(private http: HttpClient) {}

  getTopics(): Observable<Topic[]> {
    // GET https://pole-be.onrender.com/topics/
    return this.http.get<Topic[]>(`${this.baseUrl}/topics/`);
  }
}
