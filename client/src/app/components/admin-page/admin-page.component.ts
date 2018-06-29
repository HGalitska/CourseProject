import { Component, OnInit } from '@angular/core';
import {GroupsService} from "../../services/groups.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  groups;

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    this.getAllGroups()
  }

  getAllGroups() {
    this.groupsService.getAllGroups(localStorage.getItem("currentToken")).subscribe(
      groups => {
        this.groups = groups;
      }
    )
  }

  addGroup(){
    var newGroup = prompt("Enter new group's name:");
    if (newGroup) {
      var group = {name: newGroup, students: []};

      console.log(localStorage.getItem("currentToken"));
      this.groupsService.addNewGroup(group, localStorage.getItem("currentToken")).subscribe(
        result => {
          this.getAllGroups();
        }
      )
    }
  }

}
