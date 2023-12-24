import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const deliverAuth: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const password = sessionStorage.getItem('password');
  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('role');
  console.log();

  const isAuthenticated = username && password;

  if (!isAuthenticated) {
    router.navigate(['login']);
    return false;
  }

  if (role === 'deliver') {
    return true;
  } else {
    router.navigate(['home']);
    return false;
  }
};

export const clientAuth: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const password = sessionStorage.getItem('password');
  const username = sessionStorage.getItem('username');
  const role = sessionStorage.getItem('role');

  const isAuthenticated = username && password;

  if (!isAuthenticated) {
    router.navigate(['login']);
    return false;
  }

  if (role === 'client') {
    return true;
  } else {
    router.navigate(['home']);
    return false;
  }
};
