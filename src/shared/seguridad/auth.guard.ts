import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../servicios/seguridad/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      const permisos = this.authenticationService.getPermisos();
      if (permisos.some(r => route.data.permisos.includes(r))) {
        return true;
      }
      // return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;

  }
}
