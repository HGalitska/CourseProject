import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from "../services/users.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() course;
  course_id;
  owner_id;
  ownerString : string;

  constructor(private usersService : UsersService, private router : Router) { }

  ngOnInit() {
    this.usersService.getUserById(this.course.owner_id, localStorage.getItem("currentToken")).subscribe(
      data => {
        this.owner_id = data._id;
        this.ownerString = data.firstName + " " + data.lastName;
      })
      this.course_id = this.course._id;
  }

  openCoursePage() {
    this.router.navigate(['/profile/course', this.course_id])
  }

}
