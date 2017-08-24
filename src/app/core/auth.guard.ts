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
    console.log('canActivate...');
    return this.authService
      .getAuth()
      .do(v => console.log('canActivate getAuth...'))
      .map(auth => auth && !auth.hasError)
      .do(isvalid => {
        if (!isvalid) {
          // 如果没有登录,则先保存当前 url
          localStorage.setItem('redirectUrl', url);
          this.router.navigate(['/login']);
        }
      });
  }
}
