import { bootstrapApplication } from '@angular/platform-browser';
import { medireminderConfig } from './app/medireminder.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, medireminderConfig)
  .catch((err) => console.error(err));
