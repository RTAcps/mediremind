import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Medication, Reminder } from '@models/entity-interface';
import { MedicationService } from '@services/medication/medication.service';
import { ReminderService } from '@services/reminder/reminder.service';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  medications$ = new BehaviorSubject<Medication[]>([]);
  reminders$ = new BehaviorSubject<Reminder[]>([]);
  remindersWithMedicationName$ = combineLatest([
    this.reminders$,
    this.medications$
  ]).pipe(
    map(([reminders, medications]) =>
      reminders.map(reminder => ({
        ...reminder,
        medicationName: medications.find(m => m.id === reminder.medicationId)?.name || 'Desconhecido'
      }))
    )
  );
  userId = JSON.parse(sessionStorage.getItem('user') || '{}')?.id;

  constructor(
    private medicationService: MedicationService,
    private reminderService: ReminderService
  ) {}

  ngOnInit(): void {
    this.loadMedications();
    this.loadReminders();
  }

  loadMedications(): void {
    this.medicationService.getByUserId(this.userId).subscribe((data: { content:  Medication[]}) => {
      this.medications$.next(data.content);
    });
  }

  loadReminders(): void {
    this.reminderService.getByUserId(this.userId).subscribe((data: { content:  Reminder[]} ) => {
      this.reminders$.next(data.content);
    });
  }

  editMedication(med: Medication): void {
    console.log('Editar:', med);
    // this.dialog.open(EditMedicationModalComponent, { data: med });
  }

  editReminder(reminder: Reminder): void {
    console.log('Editar:', reminder);
    // this.dialog.open(EditMedicationModalComponent, { data: med });
  }

  deleteMedication(id: string): void {
    if (confirm('Tem certeza que deseja remover este medicamento?')) {
      this.medicationService.delete(id).subscribe(() => {
        this.loadMedications();
      });
    }
  }

  deleteReminder(id: string): void {
    if (confirm('Tem certeza que deseja remover este medicamento?')) {
      this.medicationService.delete(id).subscribe(() => {
        this.loadReminders();
      });
    }
  }
}
