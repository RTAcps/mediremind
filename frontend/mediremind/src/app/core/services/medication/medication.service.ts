import { Injectable } from '@angular/core';
import { Medication } from '@models/entity-interface';
import { BaseService } from '@services/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends BaseService<Medication> {
  protected override endpoint = 'medications';
}
