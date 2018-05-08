import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { LoginService } from './login.service';
import { UserService } from './user.service';

import * as decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private loginService: LoginService, private userService: UserService) {
  }

  login(formData): void {
    this.loginService.attemptAuth(formData.username, formData.password).subscribe(
      data => {
        localStorage.setItem("currentUserId", decode(data.token).user_id);
        localStorage.setItem("currentToken", data.token);

        this.userService.show_user(localStorage.getItem("currentUserId"), localStorage.getItem("currentToken")).subscribe(
          data => {
            console.log(data);
          }
        )
      }
    );

    this.router.navigate(['/profile']);
  }
}
