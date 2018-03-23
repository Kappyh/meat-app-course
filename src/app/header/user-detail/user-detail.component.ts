import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../security/login.service';
import { User } from '../../security/user.model';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  public user(): User {
    return this.loginService.user;
  }

  public isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  public login(): void {
    this.loginService.handleLogin();
  }

  public logout(): void {
    this.loginService.logout();
  }

}
