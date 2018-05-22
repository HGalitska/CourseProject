import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Router } from "@angular/router"
import {SubmittedTasksService} from "../../services/submitted-tasks.service";


@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrls: ['./task-tile.component.css']
})
export class TaskTileComponent implements OnInit {

  @Input() taskId;
  task;
  completed = false;
  mark;

  constructor(private router: Router, private tasksService : TasksService,
              private submittedTasksService : SubmittedTasksService) { }

  ngOnInit() {
    this.tasksService.getTaskById(this.taskId,localStorage.getItem("currentToken")).subscribe(
      data => {
        this.task = data;
      })

    this.submittedTasksService.getAllSubmittedTasks(localStorage.getItem("currentToken")).subscribe(
      submTasks => {
        submTasks.forEach(subTask => {
          if (subTask.task_id == this.taskId && subTask.student_id == localStorage.getItem("currentUserId")) {
            this.completed = true;
            if (subTask.mark == -1) this.mark = "-";
            else this.mark = subTask.mark;
          }
        })
      }
    )
  }

  openTaskPage() {
    this.router.navigate(['/profile/task/', this.taskId])
  }

}
