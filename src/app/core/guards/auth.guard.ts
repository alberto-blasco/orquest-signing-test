import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateChildFn = route => {
  console.log(route);
  const authService = inject(AuthService);
  const router = inject(Router);

  const isUserAuthenticated = authService.isAuthenticated();
  console.log(route.url[0].path === 'login', isUserAuthenticated);
  if (route.url[0].path === 'login') {
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
