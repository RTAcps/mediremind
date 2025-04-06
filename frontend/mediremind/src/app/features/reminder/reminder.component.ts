import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Medication, Reminder } from '@models/entity-interface';
import { MedicationService } from '@services/medication/medication.service';
import { ReminderService } from '@services/reminder/reminder.service';

@Component({
  selector: 'app-reminder',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss'
})
export class ReminderComponent implements OnInit {
  reminderForm: FormGroup;
  reminders: Reminder[] = [];
  medications: Medication[] = [];
  isEditing = false;
  currentId: string | null = null;
  userId = JSON.parse(sessionStorage.getItem('user') || '{}')?.id;

  constructor(
    private fb: FormBuilder,
    private reminderService: ReminderService,
    private medicationService: MedicationService
  ) {
    this.reminderForm = this.fb.group({
      medicationId: [''],
      reminderTime: [''],
    });
  }

  ngOnInit(): void {
    this.loadMedications();
  }

  loadMedications(): void {
    if (!this.userId) return;

    this.medicationService.getByUserId(this.userId).subscribe((medications) => {
      this.medications = medications.content;
    });
  }

  getMedicationName(id: string): string {
    return this.medications.find((m) => m.id === id)?.name || 'Desconhecido';
  }

  onSubmit(): void {
    const time = this.reminderForm.value.reminderTime;
    const today = new Date().toISOString().split('T')[0];
    const reminderTime = `${today}T${time}`;

    const formValue: Reminder = {
      ...this.reminderForm.value,
      reminderTime,
      userId: this.userId,
      sent: false,
    };

    if (this.isEditing && this.currentId) {
      this.reminderService.update(this.currentId, formValue).subscribe(() => {
        this.resetForm();
      });
    } else {
      this.reminderService.create(formValue).subscribe(() => {
        this.reminderForm.reset();
      });
    }
  }

  resetForm(): void {
    this.reminderForm.reset();
    this.currentId = null;
    this.isEditing = false;
  }
}