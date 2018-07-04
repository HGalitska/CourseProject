import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser;

  constructor(private usersService : UsersService, private router : Router) {
  }

  ngOnInit() {
    if (localStorage.getItem("currentToken") == null) {
      alert("Log in first.");
      this.router.navigate(['/about']);
    }

    else {
      this.usersService.getUserById(localStorage.getItem("currentUserId"),
        localStorage.getItem("currentToken")).subscribe(
        data => {
          this.currentUser = data;
        })
    }
  }

  changePassword() {
    var newPassword = prompt("Enter new password:");
    if (!newPassword) return;
    this.currentUser.password = newPassword;
    this.usersService.updateUserById(this.currentUser._id, localStorage.getItem("currentToken"), this.currentUser).subscribe(
      user => {
        console.log(user);
      }
    );
  }

}
