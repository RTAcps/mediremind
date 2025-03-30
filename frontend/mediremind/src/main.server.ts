import { bootstrapApplication } from '@angular/platform-browser';
import { MedireminderComponent } from './app/medireminder.component';
import { config } from './app/medireminder.config.server';

const bootstrap = () => bootstrapApplication(MedireminderComponent, config);

export default bootstrap;
