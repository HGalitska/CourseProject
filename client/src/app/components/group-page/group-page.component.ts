import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {GroupsService} from "../../services/groups.service";
import {CoursesService} from "../../services/courses.service";
import {UsersService} from "../../services/users.service";
import {TasksService} from "../../services/tasks.service";
import {SubmittedTasksService} from "../../services/submitted-tasks.service";

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {

  groupId;
  group;

  courseId;
  course;

  students;
  tasks;
  maximalTotal = 0;

  constructor(private route: ActivatedRoute, private location: Location,
              private groupsService: GroupsService, private coursesService: CoursesService,
              private usersService: UsersService, private tasksService: TasksService,
              private submittedTasksService: SubmittedTasksService) {
    this.students = [];
    this.tasks = [];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = params.group_id;
      this.courseId = params.course_id;
    });

    this.coursesService.getCourseById(this.courseId, localStorage.getItem("currentToken")).subscribe(
      course => {
        this.course = course;
        this.getTasksForCourse(course);

        this.groupsService.getGroupById(this.groupId, localStorage.getItem("currentToken")).subscribe(
          group => {
            this.group = group;
            this.getStudentsForGroup(group);

          })


      })

  }


  backToCourse() {
    this.location.back()
  }

  getTasksForCourse(course) {
    for (var i = 0; i < course.tasks.length; i++) {
      this.tasksService.getTaskById(course.tasks[i], localStorage.getItem("currentToken")).subscribe(
        task => {
          this.tasks.push(task);
          this.maximalTotal += task.maxMark;

          this.tasks.sort(function (a, b) {
            const sA = a._id;
            const sB = b._id;

            let comparison = 0;
            if (sA > sB) {
              comparison = 1;
            } else if (sA < sB) {
              comparison = -1;
            }
            return comparison;
          });
        })

    }
  }

  getStudentsForGroup(group) {
    for (var i = 0; i < group.students.length; i++) {
      this.usersService.getUserById(group.students[i], localStorage.getItem("currentToken")).subscribe(
        user => {

          user.submittedTasks = [];
          user.submittedTasks.length = this.tasks.length;
          user.totalMark = 0;
          user.totalResult = 0;

          this.students.push(user);

          this.submittedTasksService.getAllSubmittedTasks(localStorage.getItem("currentToken")).subscribe(
            submittedTasks => {
              submittedTasks.forEach((submittedTask) => {
                if (this.course.tasks.includes(submittedTask.task_id)) {
                  if (submittedTask.student_id == user._id) {

                    this.tasks.forEach((task) => {
                      if (task._id == submittedTask.task_id) {
                        submittedTask.task = task;
                        user.submittedTasks[this.tasks.indexOf(task)] = submittedTask;
                        if (submittedTask.mark != -1) {
                          user.totalMark += submittedTask.mark;
                        }


                      }
                    })
                  }
                }
              })
              if (this.maximalTotal != 0) {
                user.totalResult = parseFloat((String)
                (user.totalMark / this.maximalTotal * 100)).toFixed(2);
                console.log(user);
              }
            })

          this.students.sort(function (a, b) {
            // Use toUpperCase() to ignore character casing
            const sA = a.lastName.toUpperCase();
            const sB = b.lastName.toUpperCase();

            let comparison = 0;
            if (sA > sB) {
              comparison = 1;
            } else if (sA < sB) {
              comparison = -1;
            }
            return comparison;
          });

        })
    }
  }

}
