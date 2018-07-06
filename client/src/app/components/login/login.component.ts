import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthenticationService } from '../../services/authentication.service';

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
        if (data.token == null) {
          alert("Wrong password.");
          return;
        }
        localStorage.setItem("currentUserId", decode(data.token).user_id);
        localStorage.setItem("currentToken", data.token);

        if (localStorage.getItem("currentUserId") == localStorage.getItem("adminId")) {
          this.router.navigate(['/admin']);
        }

        else {
          this.router.navigate(['/profile/courses']);
        }
      });
  }
}
