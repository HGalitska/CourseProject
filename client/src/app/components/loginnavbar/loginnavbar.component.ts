import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-loginnavbar',
  templateUrl: './loginnavbar.component.html',
  styleUrls: ['./loginnavbar.component.css']
})
export class LoginnavbarComponent implements OnInit {

  currentUserId = localStorage.getItem("currentUserId");
  currentUser = null;

  constructor(private usersService : UsersService) { }

  ngOnInit() {
    console.log(this.currentUser);

    this.usersService.getUserById(this.currentUserId, localStorage.getItem("currentToken")).subscribe(
      user => {
        this.currentUser = user;
      }
    )
  }

}
