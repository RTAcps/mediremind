import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isAuthenticated();

  if (!isLoggedIn) {
    router.navigate(
      ['/login'], 
      { queryParams: { returnUrl: state.url } }
    );
    return false;
  }

  return true;
};
