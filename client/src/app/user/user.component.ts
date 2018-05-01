import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers : [UserService]
})
export class UserComponent {
  firstName = "";
  lastName = "Галіцька";
  username = "olena_galitska";
  eMail = "h.galitskaya@gmail.com";
  message : any

  show(){
    this.service.show_api().subscribe(res => {
        this.message = res.message;
    })
}

  constructor(private service: UserService){

  }
}
