import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.hasValidToken()) return true;

  router.navigate(['/auth']);
  return false;
};
/*
// Guard par rôle
export const roleGuard = (role: string): CanActivateFn => () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.hasValidToken() && auth.hasRole(role)) return true;

  router.navigate(['/unauthorized']);
  return false;
  
  };
*/