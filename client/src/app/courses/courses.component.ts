import { Component, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { GroupsService } from './groups.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses = []

  constructor(private coursesService: CoursesService, private groupsService: GroupsService,) { }

  ngOnInit() {

    this.groupsService.getGroup(localStorage.getItem("currentUserId"), localStorage.getItem("currentToken")).subscribe(
      data => {
        this.coursesService.getCourses(data._id, localStorage.getItem("currentToken")).subscribe(
          data => {
            this.courses = data;
          })
      })
  }


}
