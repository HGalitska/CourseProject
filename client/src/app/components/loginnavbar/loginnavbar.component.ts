import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginnavbar',
  templateUrl: './loginnavbar.component.html',
  styleUrls: ['./loginnavbar.component.css']
})
export class LoginnavbarComponent implements OnInit {

  currentUserId = null;

  constructor() { }

  ngOnInit() {
    this.currentUserId = localStorage.getItem("currentUserId");
    console.log(this.currentUserId);
  }

}
