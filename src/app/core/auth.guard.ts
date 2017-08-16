import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;

    if (localStorage.getItem('userId') !== null) {
      return true;
    }
    // 如果没有登录,则先保存当前 url
    localStorage.setItem('redirectUrl', url);

    this.router.navigate(['/login']);

    return false;
  }

}
