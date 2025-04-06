import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Medication, Reminder } from '@models/entity-interface';
import { MedicationService } from '@services/medication/medication.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  medications$ = new BehaviorSubject<Medication[]>([]);
  reminders$ = new BehaviorSubject<Reminder[]>([]); 
  userId = JSON.parse(sessionStorage.getItem('user') || '{}')?.id;

  constructor(private medicationService: MedicationService) {}

  ngOnInit(): void {
    this.loadMedications();
    // this.loadReminders(); 
  }

  loadMedications(): void {
      this.medicationService.getByUserId(this.userId).subscribe((data) => {
        this.medications$.next(data.content);
      });
    }

  editMedication(med: Medication): void {
    console.log('Editar:', med);
    // this.dialog.open(EditMedicationModalComponent, { data: med });
  }

  deleteMedication(id: string): void {
    if (confirm('Tem certeza que deseja remover este medicamento?')) {
      this.medicationService.delete(id).subscribe(() => {
        this.loadMedications();
      });
    }
  }
}
