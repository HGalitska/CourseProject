import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../services/courses.service'

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {

  courseId : string;
  course : {};

  constructor(private route: ActivatedRoute, private coursesService : CoursesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.courseId = params.course_id;
    });

    this.coursesService.getCourseById(courseId, localStorage.getItem("currentToken")).subscribe(
      data => {
        this.course = data;
      })
  }

}
