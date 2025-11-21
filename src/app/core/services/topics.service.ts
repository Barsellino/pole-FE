import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../../shared/models';
import { API_ENDPOINTS } from '../../shared/constants/api.constants';
import { environment } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class TopicsService {

  constructor(private http: HttpClient) {}

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${environment.apiBaseUrl}${API_ENDPOINTS.TOPICS}/`);
  }
}