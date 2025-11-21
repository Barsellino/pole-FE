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
  constructor(private http: HttpClient) {}

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>('/topics/');
  }
}
