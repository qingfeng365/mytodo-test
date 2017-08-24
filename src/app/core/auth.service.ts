import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UserService } from './user.service';
import { Auth } from './model/auth';

import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { User } from './model/user';

@Injectable()
export class AuthService {

  private authSubject: BehaviorSubject<Auth> = new BehaviorSubject({});

  constructor(private userService: UserService) {
    this.emptyAuth();
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

        // 先清除以前的登录状态
        localStorage.removeItem('userId');

        // 要跳回的路由
        auth.redirectUrl = localStorage.getItem('redirectUrl');
        if (!auth.redirectUrl) {
          auth.redirectUrl = '/';
        }

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
          localStorage.setItem('userId', String(user.id));
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
    localStorage.removeItem('userId');
    const auth: Auth = {
      user: null,
      hasError: true,
      errMsg: '尚未登录...',
      redirectUrl: ''
    };
    this.authSubject.next(auth);
  }
}
