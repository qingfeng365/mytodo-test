import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    console.log(url);
    return this.authService
      .getAuth()
      .map(auth => auth && !auth.hasError)
      .do(isvalid => {
        if (!isvalid) {
          this.authService.notityUnActivateRoute(url);
        }
      });
  }
}
