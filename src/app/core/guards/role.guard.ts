import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  const perfil = route.data['perfil'] as string;
  const user   = auth.usuario();

  if (!user) return router.createUrlTree(['/login']);
  if (user.perfil !== perfil) {
    const dest = user.perfil === 'porteiro' ? '/porteiro/dashboard' : '/morador/dashboard';
    return router.createUrlTree([dest]);
  }
  return true;
};
