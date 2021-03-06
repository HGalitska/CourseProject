import {Component, Input, OnInit} from '@angular/core';
import {DocumentsService} from "../../services/documents.service";
import {UsersService} from "../../services/users.service";
import {GroupsService} from "../../services/groups.service";
import {SubmittedTasksService} from "../../services/submitted-tasks.service";
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-submitted-tile',
  templateUrl: './submitted-tile.component.html',
  styleUrls: ['./submitted-tile.component.css']
})
export class SubmittedTileComponent implements OnInit {

  @Input() submittedTask;
  @Input() teacher;
  student;
  mark;
  documents = [];
  marked = true;
  task;

  constructor(private documentsService: DocumentsService, private usersService: UsersService,
              private groupsService: GroupsService, private submittedTasksService: SubmittedTasksService,
              private tasksService : TasksService) {
  }

  ngOnInit() {
    this.tasksService.getTaskById(this.submittedTask.task_id, localStorage.getItem("currentToken"))
      .subscribe(task => {
      this.task = task;
    })


    if (this.submittedTask.mark == -1) {
      this.mark = "not evaluated";
    }
    else {
      this.mark = this.submittedTask.mark;
    }

    for (var i = 0; i < this.submittedTask.docs.length; i++) {
      this.documentsService.getDocumentById(this.submittedTask.docs[i], localStorage.getItem("currentToken")).subscribe(
        document => {
          this.documents.push(document);
        }
      )
    }

    this.usersService.getUserById(this.submittedTask.student_id, localStorage.getItem("currentToken")).subscribe(
      user => {
        this.student = user;
        this.groupsService.getAllGroups(localStorage.getItem("currentToken")).subscribe(
          groups => {
            groups.forEach(group => {
              if (group.students.includes(user._id)) {
                this.student.group = group;
              }
            })
          }
        )
      }
    )

  }


  saveChanges(value) {

    if (value > this.task.maxMark) {
      alert("Mark is bigger than maximal.");
      this.submittedTask.mark = -1;
      this.submittedTasksService.updateSubmittedTaskById(this.submittedTask._id,
        localStorage.getItem("currentToken"), this.submittedTask).subscribe(
        data => {
          console.log(data);
        }
      )
      this.mark = "not evaluated";
      return;
    }
    this.marked = true;
    this.submittedTask.mark = value;
    this.submittedTasksService.updateSubmittedTaskById(this.submittedTask._id,
      localStorage.getItem("currentToken"), this.submittedTask).subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
