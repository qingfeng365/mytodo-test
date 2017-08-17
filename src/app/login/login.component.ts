import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { Auth } from '../core/model/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  auth: Auth;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onLogin(isValid: boolean) {
    if (isValid) {

      this.authService
        .validLogin(this.username, this.password)
        .then(auth => {
          const redirectUrl = (auth.redirectUrl === null) ? '/' : auth.redirectUrl;
          if (!auth.hasError) {
            this.router.navigate([redirectUrl]);
            localStorage.removeItem('redirectUrl');
          } else {
            this.auth = Object.assign({}, auth);
          }
        });
    } else {
      console.log('检验不通过');
    }
  }
}

