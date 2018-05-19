import {Component, OnInit, ɵEMPTY_ARRAY} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../../services/courses.service'
import {GroupsService} from '../../services/groups.service'
import {UsersService} from '../../services/users.service'
import {DocumentsService} from "../../services/documents.service";

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {

  courseId: string;
  ownerId: string;
  course: Object;
  owner: Object;
  documents = [];

  constructor(private route: ActivatedRoute, private coursesService: CoursesService,
              private groupsService: GroupsService, private usersService: UsersService,
              private documentsService : DocumentsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params.course_id;
    });

    this.coursesService.getCourseById(this.courseId, localStorage.getItem("currentToken")).subscribe(
      data => {
        this.course = data;
        for (var i = 0; i < data.docs.length; i++) {
          var doc = this.documentsService.getDocumentById(data.docs[i], localStorage.getItem("currentToken")).subscribe(
            data => {
              this.documents.push(data);
            }
          )
        }
        this.ownerId = data.owner_id;
        this.usersService.getUserById(this.ownerId, localStorage.getItem("currentToken")).subscribe(
          data => {
            this.owner = data;
          });
      });

  }

}
