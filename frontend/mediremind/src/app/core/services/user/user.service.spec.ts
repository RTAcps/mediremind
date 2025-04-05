import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '@models/entity-interface';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the correct endpoint', () => {
    expect((service as any).endpoint).toBe('users');
  });

  it('should make a GET request to fetch users', () => {
    const mockUsers: User[] = [{ id: '1', name: 'John Doe', email: 'john.doe@email.com' }];

    service.getAll().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
