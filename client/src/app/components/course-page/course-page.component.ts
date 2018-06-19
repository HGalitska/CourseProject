import {Component, OnInit, ɵEMPTY_ARRAY} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CoursesService} from '../../services/courses.service'
import {GroupsService} from '../../services/groups.service'
import {UsersService} from '../../services/users.service'
import {DocumentsService} from "../../services/documents.service";
import {TaskScheduler} from "protractor/built/taskScheduler";
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {

  courseId: string;
  ownerId: string;

  course;
  owner;

  documents = [];
  members = [];
  teacher = false;
  editMode = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private coursesService: CoursesService,
              private groupsService: GroupsService, private usersService: UsersService,
              private documentsService: DocumentsService, private tasksService : TasksService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params.course_id;
    });

    this.coursesService.getCourseById(this.courseId, localStorage.getItem("currentToken")).subscribe(
      data => {
        if (!data.description) data.description = "No description.";
        this.course = data;

        for (var i = 0; i < data.docs.length; i++) {
          this.documentsService.getDocumentById(data.docs[i], localStorage.getItem("currentToken")).subscribe(
            data => {
              this.documents.push(data);
            }
          )
        }

        for (var i = 0; i < data.members.length; i++) {
          this.groupsService.getGroupById(data.members[i], localStorage.getItem("currentToken")).subscribe(
            group => {

              this.members.push(group);
            }
          )
        }


        this.ownerId = data.owner_id;
        this.usersService.getUserById(this.ownerId, localStorage.getItem("currentToken")).subscribe(
          data => {
            this.owner = data;
          });

        if (this.ownerId == localStorage.getItem("currentUserId")) {
          this.teacher = true;
        }
      });

  }

  enterEditingMode() {
    this.editMode = !this.editMode;
  }

  update() {
    // this.documents = [];
    // for (var i = 0; i < this.course.docs.length; i++) {
    //   this.documentsService.getDocumentById(this.course.docs[i], localStorage.getItem("currentToken")).subscribe(
    //     data => {
    //       this.documents.push(data);
    //     }
    //   )
    // }
  }

  saveChanges(value) {
    this.coursesService.updateCourseById(this.courseId, localStorage.getItem("currentToken"), this.course).subscribe(
      course => {
        this.course = course;
      }
    )
  }

  deleteCourse() {
    var del = confirm("Do you really want to delete this course?");
    if (!del){
      return;
    }


    this.coursesService.deleteCourseById(this.courseId, localStorage.getItem("currentToken")).subscribe(
      course => {
        console.log(course);
        this.router.navigate(['/profile/courses'])
      }
    )
  }

  openTaskCreation(){
    var task = {
      title: "No Name",
      deadline : Date.now(),
      description : "No description.",
      docs: []
    }

    this.tasksService.addNewTask(task, localStorage.getItem("currentToken")).subscribe(
      task => {
        this.course.tasks.push(task._id);
        this.coursesService.updateCourseById(this.courseId, localStorage.getItem("currentToken"), this.course).subscribe(
          course => {
            this.course = course;
            // this.router.navigate(['/profile/task', task._id]);
          }
        )
      }
    )
  }


}
