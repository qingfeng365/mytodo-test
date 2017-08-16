import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from './model/user';

@Injectable()
export class UserService {
  private apiUrl = 'api/users';

  constructor(private http: Http) { }
  catchError(err) {
    console.log(err);
    return Promise.reject(err.message || err);
  }

  findUser(username: string): Promise<User> {
    const url = `${this.apiUrl}/?username=${username}`;
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(res => {
        const users = res.json().data as User[];
        if (users.length > 0) {
          return users[0];
        } else {
          return null;
        }
      })
      .catch(this.catchError);
  }
}
