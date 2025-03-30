import { bootstrapApplication } from '@angular/platform-browser';
import { MedireminderComponent } from './app/medireminder.component';
import { medireminderConfig } from './app/medireminder.config';

bootstrapApplication(MedireminderComponent, medireminderConfig)
  .catch((err) => console.error(err));
