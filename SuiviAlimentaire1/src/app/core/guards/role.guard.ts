// src/app/core/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Retourne la route d'accueil selon le rôle de l'utilisateur
 */
function getHomeRouteForRole(role: string): string {
  switch (role) {
    case 'ADMIN':
      return '/admin/dashboard';
    case 'USER':
      return '/aliments';
    default:
      return '/login';
  }
}


export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // 1. Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem('token');
  if (!token) {
    // Pas connecté, rediriger vers login avec returnUrl
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  // 2. Récupérer le rôle de l'utilisateur
  const userRole = localStorage.getItem('userRole');
  if (!userRole) {
    // Pas de rôle trouvé, nettoyer et rediriger
    localStorage.clear();
    return router.createUrlTree(['/login']);
  }

  // 3. Vérifier les rôles autorisés (si spécifiés)
  const allowedRoles = (route.data?.['roles'] as string[] | undefined) ?? [];

  // Si aucun rôle spécifié, autoriser l'accès (juste authentifié)
  if (allowedRoles.length === 0) {
    return true;
  }

  // 4. Vérifier si le rôle de l'utilisateur est autorisé
  if (allowedRoles.includes(userRole)) {
    return true;
  }

  // 5. Rôle non autorisé, rediriger vers la page d'accueil du rôle
  return router.createUrlTree([getHomeRouteForRole(userRole)]);
};
