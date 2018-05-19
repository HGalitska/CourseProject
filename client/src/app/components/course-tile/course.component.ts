import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from "../../services/users.service"
import { Router } from "@angular/router"
import {SubmittedTasksService} from "../../services/submitted-tasks.service";

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
  progress;
  completedCount = 0;

  constructor(private usersService : UsersService, private router : Router,
              private submittedTasksService : SubmittedTasksService) { }

  ngOnInit() {
    this.usersService.getUserById(this.course.owner_id, localStorage.getItem("currentToken")).subscribe(
      data => {
        this.owner_id = data._id;
        this.ownerString = data.firstName + " " + data.lastName;
      })
      this.course_id = this.course._id;


    var tasksCount = this.course.tasks.length;

    var tasks = this.course.tasks;

    this.submittedTasksService.getAllSubmittedTasks(localStorage.getItem("currentToken")).subscribe(
      submittedTasks => {
        for (var i = 0; i < submittedTasks.length; i++) {
          var submittedTask = submittedTasks[i];
          if (tasks.includes(submittedTask.task_id) && submittedTask.student_id == localStorage.getItem("currentUserId")) {
            this.completedCount = this.completedCount + 1;
          }
        }

        this.progress = this.completedCount + " / " + tasksCount.toString() + " (" + this.completedCount/tasksCount * 100 + "% )"
      }
    )



  }

  openCoursePage() {
    this.router.navigate(['/profile/course', this.course_id, this.owner_id])
  }

}
