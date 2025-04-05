import { TestBed } from '@angular/core/testing';

import { MedicationService } from './medication.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Medication } from '@models/entity-interface';

describe('MedicationService', () => {
  let service: MedicationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedicationService, provideHttpClientTesting()],
    });
    service = TestBed.inject(MedicationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the correct endpoint', () => {
    expect((service as any).endpoint).toBe('medications');
  });

  it('should make a GET request to fetch medications', () => {
    const mockMedications: Medication[] = [
      { id: '1', name: 'Medication A', dosage: '10mg', frequency: 'twice a day', userId: '1' },
      { id: '2', name: 'Medication B', dosage: '20mg', frequency: 'twice a day', userId: '2' },
    ];

    service.getAll().subscribe((medications) => {
      expect(medications).toEqual(mockMedications);
    });

    const req = httpMock.expectOne('medications');
    expect(req.request.method).toBe('GET');
    req.flush(mockMedications);
  });
});
