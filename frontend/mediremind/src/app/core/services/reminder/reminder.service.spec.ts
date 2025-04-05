import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Reminder } from '@models/entity-interface';
import { ReminderService } from './reminder.service';

describe('ReminderService', () => {
  let service: ReminderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReminderService, provideHttpClientTesting()],
    });
    service = TestBed.inject(ReminderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the correct endpoint', () => {
    expect(service['endpoint']).toBe('reminders');
  });

  it('should perform a GET request to fetch reminders', () => {
    const mockReminders: Reminder[] = [
      { id: '1', userId: '1', medicationId: '1', dateTime: '2023-10-01T10:00:00Z' },
      { id: '2', userId: '2', medicationId: '2', dateTime: '2023-10-01T10:00:00Z' },
    ];

    service.getAll().subscribe((reminders) => {
      expect(reminders).toEqual(mockReminders);
    });

    const req = httpMock.expectOne(`reminders`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReminders);
  });

  it('should perform a POST request to create a reminder', () => {
    const newReminder: Reminder = {
      id: '3',
      medicationId: '3',
      userId: '3',
      dateTime: '2023-10-01T10:00:00Z',
    };

    service.create(newReminder).subscribe((response) => {
      expect(response).toEqual(newReminder);
    });

    const req = httpMock.expectOne(`/reminders`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newReminder);
    req.flush(newReminder);
  });

  it('should perform a DELETE request to delete a reminder', () => {
    const reminderId = '1';

    service.delete(reminderId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(
      `/reminders/${reminderId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
