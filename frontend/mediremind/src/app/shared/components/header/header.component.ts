
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public router: Router) {}

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  shouldShowHeader(): boolean {
    const hiddenRoutes = ['/login', '/register'];
    return !hiddenRoutes.includes(this.router.url);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToMedication() {
    this.router.navigate(['/medication']);
  }
  
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
