import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
      canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
//   {
//     path: 'users',
//     loadComponent: () =>
//       import('./features/users/users.component').then((m) => m.UsersComponent),
//     canActivate: [authGuard],
//   },
//   {
//     path: 'medications',
//     loadComponent: () =>
//       import('./features/medications/medications.component').then(
//         (m) => m.MedicationsComponent
//       ),
//     canActivate: [authGuard],
//   },
//   {
//     path: 'reminders',
//     loadComponent: () =>
//       import('./features/reminders/reminders.component').then(
//         (m) => m.RemindersComponent
//       ),
//     canActivate: [authGuard],
//   },
//   {
//     path: 'unauthorized',
//     loadComponent: () =>
//       import('./features/unauthorized/unauthorized.component').then(
//         (m) => m.UnauthorizedComponent
//       ),
//   },
  {
    path: '**',
    redirectTo: '', 
  },
];