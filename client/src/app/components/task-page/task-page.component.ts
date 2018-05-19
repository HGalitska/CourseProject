import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  taskId: string;
  task: Object;

  constructor(private route: ActivatedRoute,
              private tasksService: TasksService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.taskId = params.task_id;
    });

    this.tasksService.getTaskById(this.taskId, localStorage.getItem("currentToken")).subscribe(
      data => {
        this.task = data;
      }
    )
  }

}
