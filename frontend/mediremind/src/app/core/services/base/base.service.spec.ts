import { TestBed } from '@angular/core/testing';

import { IEntity } from '@models/entity-interface';
import { BaseService } from './base.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';

class TestEntity implements IEntity {
  id!: string;
}

@Injectable()
class TestService extends BaseService<TestEntity> {
  protected endpoint = 'test-entities';
}

describe('BaseService', () => {
  let service: TestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestService, provideHttpClientTesting()],
    });
    service = TestBed.inject(TestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all entities', () => {
    const mockEntities: TestEntity[] = [{ id: '1' }, { id: '2' }];

    service.getAll().subscribe((entities) => {
      expect(entities).toEqual(mockEntities);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/test-entities');
    expect(req.request.method).toBe('GET');
    req.flush(mockEntities);
  });

  it('should fetch an entity by ID', () => {
    const mockEntity: TestEntity = { id: '1' };

    service.getById('1').subscribe((entity) => {
      expect(entity).toEqual(mockEntity);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/test-entities/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockEntity);
  });

  it('should create a new entity', () => {
    const newEntity: TestEntity = { id: '3' };

    service.create(newEntity).subscribe((entity) => {
      expect(entity).toEqual(newEntity);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/test-entities');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEntity);
    req.flush(newEntity);
  });

  it('should update an entity', () => {
    const updatedEntity: TestEntity = { id: '1' };

    service.update('1', updatedEntity).subscribe((entity) => {
      expect(entity).toEqual(updatedEntity);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/test-entities/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEntity);
    req.flush(updatedEntity);
  });

  it('should delete an entity', () => {
    service.delete('1').subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/test-entities/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
