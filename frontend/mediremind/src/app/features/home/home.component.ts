import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Medication, Reminder } from '@models/entity-interface';
import { AuthService } from '@services/auth/auth.service';
import { MedicationService } from '@services/medication/medication.service';
import { ReminderService } from '@services/reminder/reminder.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private medicationService = inject(MedicationService);
  private reminderService = inject(ReminderService);
  private authService = inject(AuthService);

  medications$: Observable<Medication[]>;
  reminders$: Observable<Reminder[]>;

  constructor() {
    const user = this.authService.currentUser;
    // if (!user) {
    //   throw new Error('User is not authenticated');
    // }
    const role = user?.role;

    this.medications$ = this.medicationService.getAll().pipe(
      map(medications => {
        if (role === 'Paciente') {
          return medications.filter(m => m.userId === user?.id);
        }
        console.log('medications: ', medications);
        
        return medications;
      })
    );

    this.reminders$ = this.reminderService.getAll().pipe(
      map(reminders => {
        if (role === 'Paciente') {
          return reminders.filter(r => r.userId === user?.id);
        }
        console.log('reminders: ', reminders);
        
        return reminders;
      })
    );
  }
}
