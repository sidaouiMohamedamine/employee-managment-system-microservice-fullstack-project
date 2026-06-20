import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.hasValidToken()) {
    return true;
  }

  router.navigate(['/auth']);
  return false;
};
