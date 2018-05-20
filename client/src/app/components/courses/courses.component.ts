import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses = [];
  teacher = false;

  constructor(private coursesService: CoursesService, private groupsService: GroupsService, ) { }

  ngOnInit() {
    this.getCoursesForCurrentUser();
  }

  getCoursesForCurrentUser() {
    this.coursesService.getAllCourses(localStorage.getItem("currentToken")).subscribe(
      allCourses => {
        for (var i = 0; i < allCourses.length; i++) {
          if (allCourses[i].owner_id == localStorage.getItem("currentUserId")) {
            this.courses.push(allCourses[i]);
          }
        }

        if (this.courses.length != 0){
          this.teacher = true;
          return;
        }
    }
    )



    const userId = localStorage.getItem("currentUserId");
    this.groupsService.getAllGroups(localStorage.getItem("currentToken")).subscribe(
      groups => {
        for (var i = 0; i < groups.length; i++){
          var group = groups[i];
          for (var j = 0; j < group.students.length; j++) {
            var studentId = group.students[j];

            if (studentId == userId) {
              this.getCoursesForGroup(group._id);
            }
          }
        }
      });
  }

  getCoursesForGroup(groupId) {
    this.coursesService.getAllCourses(localStorage.getItem("currentToken")).subscribe(
      courses => {
        for (var i = 0; i < courses.length; i++) {
          var course = courses[i];
          for (var j = 0; j < course.members.length; j++) {
            var memberId = course.members[j];

            if (memberId == groupId && !this.courses.includes(course)) {
              this.courses.push(course);
            }
          }
        }
      });
  }
}
