import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  validLogin(userName: string, password: string): boolean {
    if (userName && userName !== '' && userName !== 'no') {
      return true;
    } else {
      return false;
    }
  }

}
