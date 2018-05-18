import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthenticationService } from '../services/authentication.service';

import * as decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  login(formData): void {
    this.authenticationService.attemptAuth(formData.username, formData.password).subscribe(
      data => {
        localStorage.setItem("currentUserId", decode(data.token).user_id);
        localStorage.setItem("currentToken", data.token);

        this.router.navigate(['/profile']);
      });
  }
}
