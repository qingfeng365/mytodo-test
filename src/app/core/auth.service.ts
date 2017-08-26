import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UserService } from './user.service';
import { Auth } from './model/auth';

import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { User } from './model/user';
import { Router } from '@angular/router';

import 'rxjs/add/operator/withLatestFrom';
// import 'rxjs/Rx';

@Injectable()
export class AuthService {

  private authSubject: BehaviorSubject<Auth> = new BehaviorSubject({});
  private redirectUrlSubject: BehaviorSubject<string> =
  new BehaviorSubject('/');
  private loginSucceedSubject: BehaviorSubject<boolean> =
  new BehaviorSubject(null);

  constructor(private userService: UserService,
    private router: Router) {
    this.emptyAuth();
    this.procLoginSucceed();
  }
  catchError(err) {
    console.log(err);
    return Promise.reject(err.message || err);
  }

  validLogin(username: string, pw: string): Promise<Auth> {
    return this.userService
      .findUser(username)
      .then(user => {
        const auth = new Auth();

        auth.hasError = false;
        auth.errMsg = '';
        auth.user = null;
        if (!user) {
          auth.hasError = true;
          auth.errMsg = '用户不存在.';
        } else {
          if (user.password !== pw) {
            auth.hasError = true;
            auth.errMsg = '密码不正确.';
          }
        }
        if (!auth.hasError) {
          auth.user = Object.assign({}, user);
        }

        this.authSubject.next(Object.assign({}, auth));
        return auth;
      })
      .catch(this.catchError);
  }

  getAuth(): Observable<Auth> {
    return this.authSubject.asObservable();
  }

  emptyAuth(): void {
    const auth: Auth = {
      user: null,
      hasError: true,
      errMsg: '尚未登录...',
    };
    this.authSubject.next(auth);
  }

  notityUnActivateRoute(url: string): void {
    this.redirectUrlSubject.next(url);
    this.router.navigate(['/login']);
  }

  notityLoginState(isLogin: boolean): void {
    if (!isLogin) {
      this.emptyAuth();
    }
    this.loginSucceedSubject.next(isLogin);
  }

  private procLoginSucceed(): void {
    this.loginSucceedSubject.asObservable()
      .withLatestFrom(
      this.authSubject.asObservable(),
      this.redirectUrlSubject.asObservable()
      )
      .subscribe(v => {
        const isLoginSucceed = v[0];
        const redirectUrl = v[2];
        if (isLoginSucceed !== null) {
          if (isLoginSucceed) {
            this.router.navigateByUrl(redirectUrl);
          } else {
            // 如果是登出, 则可跳转的 url 要重置
            this.redirectUrlSubject.next('/');
            this.router.navigateByUrl('/login');
          }
        }
      });
  }
}

