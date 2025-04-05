import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEntity } from '@models/entity-interface';
import { Observable } from 'rxjs';

const API_BASE = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends IEntity> {
  protected http = inject(HttpClient);
  protected abstract endpoint: string;

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${API_BASE}/${this.endpoint}`);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${API_BASE}/${this.endpoint}/${id}`);
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(`${API_BASE}/${this.endpoint}`, data);
  }

  update(id: string, data: T): Observable<T> {
    return this.http.put<T>(`${API_BASE}/${this.endpoint}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/${this.endpoint}/${id}`);
  }
}
