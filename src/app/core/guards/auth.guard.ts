import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateChildFn = route => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isUserAuthenticated = authService.isAuthenticated();
  if (route.url[0]?.path === 'login') {
    if (isUserAuthenticated) {
      router.navigateByUrl('/');
    }

    return !isUserAuthenticated;
  } else {
    if (!isUserAuthenticated) {
      router.navigateByUrl('login');
    }

    return isUserAuthenticated;
  }
};
