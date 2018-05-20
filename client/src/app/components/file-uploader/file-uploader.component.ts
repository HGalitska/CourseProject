import {Component, OnInit, Input} from '@angular/core';
import {Http} from "@angular/http";
import {SubmittedTasksService} from "../../services/submitted-tasks.service";
import {CoursesService} from "../../services/courses.service";
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  @Input() type;
  @Input() task_id;
  @Input() user_id;
  @Input() course_id;


  filesToUpload: Array<File> = [];

  constructor(private http: Http, private submittedTasksService: SubmittedTasksService,
              private coursesService: CoursesService, private tasksService: TasksService) {
  }

  ngOnInit() {
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    console.log('form data variable :   ' + formData.toString());
    this.http.post('http://localhost:3000/documents/', formData)
      .map((files) => files.json())
      .subscribe(files => {
        console.log(files);
        this.addFilesToCollection(files);
      })
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
  }

  addFilesToCollection(files) {
    switch (this.type) {
      case "submitted":
        this.addToSubmitted(files);
        break;
      case "material":
        this.addToCourse(files);
        break;
      case "task":
        this.addToTask(files);
        break;
      default:
        console.log("Files not bound.");
    }
  }

  addToSubmitted(files) {
    var newSubmittedTask = {
      task_id: this.task_id,
      student_id: this.user_id,
      date: Date.now(),
      mark: -1,
      docs: []
    }
    console.log(files);
    for (var i = 0; i < files.length; i++) {
      newSubmittedTask.docs.push(files[i]._id);
    }
    this.submittedTasksService.addNewSubmittedTask(newSubmittedTask, localStorage.getItem("currentToken")).subscribe(
      data => {
        console.log(data);
      }
    )
  }

  addToCourse(files) {
    console.log(this.course_id);
    this.coursesService.getCourseById(this.course_id, localStorage.getItem("currentToken")).subscribe(
      course => {
        for (var i = 0; i < files.length; i++) {
          course.docs.push(files[i]._id);
          console.log(course.docs);
        }

        this.coursesService.updateCourseById(this.course_id, localStorage.getItem("currentToken"), course).subscribe(
          course => {
            console.log(course);
          }
        );
      }
    )
  }

  addToTask(files) {
    this.tasksService.getTaskById(this.task_id, localStorage.getItem("currentToken")).subscribe(
      task => {
        for (var i = 0; i < files.length; i++) {
          task.docs.push(files[i]._id);
        }

        this.tasksService.updateTaskById(this.task_id, localStorage.getItem("currentToken"), task).subscribe(
          task => {
            console.log(task);
          }
        );
      }
    )
  }

}
