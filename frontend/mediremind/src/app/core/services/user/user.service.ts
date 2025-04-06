import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/entity-interface';
import { BaseService } from '@services/base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  protected override endpoint = 'users';
  protected baseUrl = 'http://localhost:8080/api/v1';

  getByEmail(email: string): Observable<{ content: User[] }> {
    const params = new HttpParams().set('email', email);
    return this.http.get<{ content: User[] }>(
      `${this.baseUrl}/${this.endpoint}`,
      { params }
    );
  }
}
