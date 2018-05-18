import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser = {}

  constructor(private usersService : UsersService) {
  }

  ngOnInit() {
    this.usersService.getUserById(localStorage.getItem("currentUserId"),
    localStorage.getItem("currentToken")).subscribe(
      data => {
        this.currentUser = data;
      })
  }

}
