import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEntity } from '@models/entity-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends IEntity> {
  protected http = inject(HttpClient);
  protected abstract endpoint: string;
  protected API_BASE = 'http://localhost:8080/api/v1';

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_BASE}/${this.endpoint}`);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.API_BASE}/${this.endpoint}/${id}`);
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(`${this.API_BASE}/${this.endpoint}`, data);
  }

  update(id: string, data: T): Observable<T> {
    return this.http.put<T>(`${this.API_BASE}/${this.endpoint}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${this.endpoint}/${id}`);
  }
}
