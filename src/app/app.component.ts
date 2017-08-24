import { Component, OnInit } from '@angular/core';
import { Auth } from './core/model/auth';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '待办事项管理';
  auth: Auth;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService
      .getAuth()
      .subscribe(auth =>
        this.auth = Object.assign({}, auth));
  }
  logout(): void {
    this.authService.emptyAuth();
    this.auth = null;
    this.router.navigate(['login']);
  }
}
