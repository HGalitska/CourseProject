import { Component } from '@angular/core';
import {Router} from "@angular/router";

import { SignupService } from './signup.service';
import { LoginService } from '../login/login.service';

import * as decode from "jwt-decode";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private router: Router, private signupService: SignupService, private loginService: LoginService) {
  }

  signup(formData): void {
    var newUser = {
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      eMail: formData.eMail
    }
    this.signupService.attemptSignup(newUser).subscribe(
      data => {
        this.loginService.attemptAuth(formData.username, formData.password).subscribe(
          data => {
            localStorage.setItem("currentUserId", decode(data.token).user_id);
            localStorage.setItem("currentToken", data.token);
          });
      });

      this.router.navigate(['/profile']);
  }

}
