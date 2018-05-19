import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Router } from "@angular/router"


@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrls: ['./task-tile.component.css']
})
export class TaskTileComponent implements OnInit {

  @Input() taskId;
  task;

  constructor(private router: Router, private tasksService : TasksService) { }

  ngOnInit() {
    this.tasksService.getTaskById(this.taskId,localStorage.getItem("currentToken")).subscribe(
      data => {
        this.task = data;
      })
  }

  openTaskPage() {
    this.router.navigate(['/profile/task/', this.taskId])
  }

}
