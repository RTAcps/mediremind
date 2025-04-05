import { Injectable } from '@angular/core';
import { Reminder } from '@models/entity-interface';
import { BaseService } from '@services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderService extends BaseService<Reminder> {
  protected override endpoint = 'reminders';
}