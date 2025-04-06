import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Medication } from '@models/entity-interface';
import { MedicationService } from '@services/medication/medication.service';

@Component({
  selector: 'app-medication',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medication.component.html',
  styleUrl: './medication.component.scss',
})
export class MedicationComponent {
  medicationForm: FormGroup;
  medications: Medication[] = [];
  isEditing = false;
  currentId: string | null = null;
  userId = JSON.parse(sessionStorage.getItem('user') || '{}')?.id;

  constructor(
    private fb: FormBuilder,
    private medicationService: MedicationService
  ) {
    this.medicationForm = this.fb.group({
      name: [''],
      dosage: [''],
      time: [''],
      frequency: [''],
    });
  }

  onSubmit(): void {
    const formValue = {
      ...this.medicationForm.value,
      userId: this.userId,
    };

    if (this.isEditing && this.currentId) {
      this.medicationService.update(this.currentId, formValue).subscribe(() => {
        this.resetForm();
      });
    } else {
      this.medicationService.create(formValue).subscribe(() => {
        this.medicationForm.reset();
      });
    }
  }

  resetForm(): void {
    this.medicationForm.reset();
    this.currentId = null;
    this.isEditing = false;
  }
}
