import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import * as decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = next.data.expectedRole;
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload = decode(token);
    console.log(tokenPayload)
    if (!this.auth.isLoggedIn() || tokenPayload.role !== expectedRole) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
