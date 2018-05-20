import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TasksService} from "../../services/tasks.service";
import {DocumentsService} from "../../services/documents.service";
import {SubmittedTasksService} from "../../services/submitted-tasks.service";
import {Location} from '@angular/common';
import {CoursesService} from "../../services/courses.service";


@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
})
export class TaskPageComponent implements OnInit {

  taskId: string;
  task: Object;
  documents = [];
  currentUser;
  attempts = [];
  teacher = false;

  constructor(private route: ActivatedRoute, private location: Location,
              private tasksService: TasksService, private documentsService: DocumentsService,
              private submittedTasksService : SubmittedTasksService, private coursesService : CoursesService) {
    this.teacher = false;
  }

  ngOnInit() {
    this.currentUser = localStorage.getItem("currentUserId");
    this.route.params.subscribe(params => {
      this.taskId = params.task_id;
    });

    this.tasksService.getTaskById(this.taskId, localStorage.getItem("currentToken")).subscribe(
      data => {
        this.task = data;
        for (var i = 0; i < data.docs.length; i++) {
          var doc = this.documentsService.getDocumentById(data.docs[i], localStorage.getItem("currentToken")).subscribe(
            data => {
              this.documents.push(data);
            }
          )
        }

      }
    )

    this.coursesService.getAllCourses(localStorage.getItem("currentToken")).subscribe(
      courses => {
        courses.forEach((course) => {
          if (course.owner_id == localStorage.getItem("currentUserId")) {
            this.teacher = true;
          }
        })
      }
    )

    this.submittedTasksService.getAllSubmittedTasks(localStorage.getItem("currentToken")).subscribe(
      data => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].task_id == this.taskId && data[i].student_id == this.currentUser) {
            this.attempts.push(data[i]);
          }
        }
      }
    )

  }

  backToCourse() {
    this.location.back()
  }

}
