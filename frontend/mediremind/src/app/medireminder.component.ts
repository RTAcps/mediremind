import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';
import { filter } from 'rxjs';

@Component({
  selector: 'medireminder-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './medireminder.component.html',
  styleUrl: './medireminder.component.scss'
})
export class MedireminderComponent {
  showHeader = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.showHeader = !(url.includes('/login') || url.includes('/register'));
      });
  }
}
