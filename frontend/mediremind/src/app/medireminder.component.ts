import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'medireminder-root',
  imports: [RouterOutlet],
  templateUrl: './medireminder.component.html',
  styleUrl: './medireminder.component.scss'
})
export class MedireminderComponent {
  title = 'mediremind';
}
