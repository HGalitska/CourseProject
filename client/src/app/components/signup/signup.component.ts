import {Component} from '@angular/core';
import {Router} from "@angular/router";

import {UsersService} from '../../services/users.service';
import {AuthenticationService} from '../../services/authentication.service';

import * as decode from "jwt-decode";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private router: Router,
              private usersService: UsersService,
              private authenticationService: AuthenticationService) {
  }

  signup(formData): void {

    var newUser = {
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      eMail: formData.eMail
    }


    this.usersService.getAllUsers().subscribe(
      users => {
        for (var i = 0; i < users.length; i++) {
          if (users[i].username == newUser.username) {
            alert("This username is already being used.");
            return;
          }
        }
        this.usersService.addNewUser(newUser).subscribe(
          nUser => {

            this.authenticationService.attemptAuth(formData.username, formData.password).subscribe(
              data => {
                console.log(data);
                localStorage.setItem("currentUserId", decode(data.token).user_id);
                localStorage.setItem("currentToken", data.token);

                this.router.navigate(['/profile']);
              });

          }
        )
      });
  }

}
