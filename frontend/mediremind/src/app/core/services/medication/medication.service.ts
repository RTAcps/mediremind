import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medication } from '@models/entity-interface';
import { BaseService } from '@services/base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicationService extends BaseService<Medication> {
  protected override endpoint = 'medications';
  protected baseUrl = 'http://localhost:8080/api/v1';

  getByUserId(userId: string): Observable<{ content: Medication[] }> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<{ content: Medication[] }>(
      `${this.baseUrl}/${this.endpoint}`,
      { params }
    );
  }
}
