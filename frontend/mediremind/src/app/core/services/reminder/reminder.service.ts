import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reminder } from '@models/entity-interface';
import { BaseService } from '@services/base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReminderService extends BaseService<Reminder> {
  protected override endpoint = 'reminders';
  protected baseUrl = 'http://localhost:8080/api/v1';

  getByUserId(userId: string): Observable<{ content: Reminder[] }> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<{ content: Reminder[] }>(
      `${this.baseUrl}/${this.endpoint}`,
      { params }
    );
  }
}