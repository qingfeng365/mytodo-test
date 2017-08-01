import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(isValid: boolean) {
    if (isValid) {
      const isCanLogin = this.authService.validLogin(this.username, this.password);
      console.log('登录检查:' + isCanLogin);
    } else {
      console.log('检验不通过');
    }
  }
}
