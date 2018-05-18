import {Component, OnInit, ɵEMPTY_ARRAY} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../../services/courses.service'
import {GroupsService} from '../../services/groups.service'
import {UsersService} from '../../services/users.service'

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
  members;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService,
              private groupsService: GroupsService, private usersService: UsersService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params.course_id;
    });

    this.coursesService.getCourseById(this.courseId, localStorage.getItem("currentToken")).subscribe(
      data => {
        this.course = data;
        this.ownerId = data.owner_id;
        this.members = [];
        for (var i = 0; i < data.members.length; i++) {
          this.members.push(data.members[i]);
        }
        this.usersService.getUserById(this.ownerId, localStorage.getItem("currentToken")).subscribe(
          data => {
            this.owner = data;
          });
      });

  }

}
