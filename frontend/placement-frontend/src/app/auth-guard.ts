
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './services/auth';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Redirect users who are not logged in
  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  // Check whether this route requires a specific role
  const requiredRole = route.data['role'] as string | undefined;

  if (requiredRole && !auth.hasRole(requiredRole)) {
    const user = auth.getCurrentUser();

    if (user?.role?.toUpperCase() === 'STUDENT') {
      return router.createUrlTree(['/student-dashboard']);
    }

    if (user?.role?.toUpperCase() === 'RECRUITER') {
      return router.createUrlTree(['/recruiter-dashboard']);
    }

    return router.createUrlTree(['/login']);
  }

  return true;
};
