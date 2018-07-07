import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupsService} from "../../services/groups.service";
import {UsersService} from "../../services/users.service";
import {CoursesService} from "../../services/courses.service";

@Component({
  selector: 'app-group-edit-page',
  templateUrl: './group-edit-page.component.html',
  styleUrls: ['./group-edit-page.component.css']
})
export class GroupEditPageComponent implements OnInit {

  groupId;
  group;

  students = [];
  courses = [];

  constructor(private route: ActivatedRoute, private groupsService: GroupsService,
              private usersService: UsersService, private coursesService: CoursesService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = params.group_id;


      this.groupsService.getGroupById(this.groupId, localStorage.getItem("currentToken")).subscribe(
        group => {
          this.group = group;

          this.getStudentsForGroup(group);
        }
      )



      this.coursesService.getAllCourses(localStorage.getItem("currentToken")).subscribe(
        courses => {
          this.courses = [];
          for (var i = 0; i < courses.length; i++) {
            var course = courses[i];
            for (var j = 0; j < course.members.length; j++) {
              var memberId = course.members[j];

              if (memberId == this.groupId && !this.courses.includes(course)) {
                this.courses.push(course);
              }
            }
          }
        });

    });
  }

  getStudentsForGroup(group) {
    this.students = [];
    for (var i = 0; i < group.students.length; i++) {
      this.usersService.getUserById(group.students[i], localStorage.getItem("currentToken")).subscribe(
        user => {
          this.students.push(user);

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

  renameGroup() {
    var newName = prompt("Change " + this.group.name + " to ");

    if (!newName) return

    this.group.name = newName;

    this.groupsService.updateGroupById(this.groupId, localStorage.getItem("currentToken"), this.group).subscribe(
      group => {
      }
    )
  }

  removeStudent(student) {
    var del = confirm("Do you really want to delete " + student.lastName + " " + student.firstName +
      " from " + this.group.name + "?");
    if (!del) {
      return;
    }

    else {

      this.group.students.splice(this.group.students.indexOf(student._id), 1);

      this.groupsService.updateGroupById(this.groupId, localStorage.getItem("currentToken"), this.group).subscribe(
        group => {
          this.getStudentsForGroup(group);
        }
      )
    }
  }

  moveStudent(student) {
    var groupName = prompt("Move " + student.lastName + " " + student.firstName +
      " from " + this.group.name + " to ...");

    this.groupsService.getAllGroups(localStorage.getItem("currentToken")).subscribe(
      groups => {
        var match = false;
        groups.forEach(group => {
          if (group.name == groupName) {
            match = true;
            var move = confirm("Do you really want to move " + student.lastName + " " + student.firstName +
              " to " + group.name + "?");
            if (!move) {
              return;
            }
            else {
              group.students.push(student._id);
              this.groupsService.updateGroupById(group._id, localStorage.getItem("currentToken"), group).subscribe(
                group => {
                  console.log(group.students);
                }
              )

              this.group.students.splice(this.group.students.indexOf(student._id), 1);

              this.groupsService.updateGroupById(this.groupId, localStorage.getItem("currentToken"), this.group).subscribe(
                group => {
                  console.log(group.students);
                }
              )

            }
          }
        })

        if (match == false) {
          alert("No such group.")
          return
        }
        this.getStudentsForGroup(this.group);
      }
    )

  }

  removeCourse() {
        var promptString = ""
        this.courses.forEach(course => {
          promptString += this.courses.indexOf(course) + " - " + course.name + "\n";
        })

        var choice = prompt(promptString);
        if(choice != undefined) {
          var toRemoveCourse = this.courses[choice];
          toRemoveCourse.members.splice(toRemoveCourse.members.indexOf(this.groupId), 1);

          this.courses.splice(this.courses.indexOf(toRemoveCourse, 1));

          this.coursesService.updateCourseById(toRemoveCourse._id, localStorage.getItem("currentToken"), toRemoveCourse).subscribe(
            updatedCourse => console.log(updatedCourse)
          );
        }

  }

  addCourse() {

    var availableCourses = [];
    this.coursesService.getAllCourses(localStorage.getItem("currentToken")).subscribe(
      allCourses => {
        console.log(this.courses);
        allCourses.forEach(course => {
          var match = false;
          this.courses.forEach(groupCourse => {
            if (course._id == groupCourse._id) match = true;
          })
          if (!match) availableCourses.push(course);
        })

        var promptString = ""
        availableCourses.forEach(course => {
          promptString += availableCourses.indexOf(course) + " - " + course.name + "\n";
        })

        var choice = prompt(promptString);
        if(choice != undefined) {
          var newCourse = availableCourses[choice];
          console.log(newCourse)
          this.courses.push(newCourse);
          newCourse.members.push(this.groupId);
          console.log(newCourse)

          this.coursesService.updateCourseById(newCourse._id, localStorage.getItem("currentToken"), newCourse).subscribe(
            updatedCourse => console.log(updatedCourse)
          );
        }


      }
    )

  }

  addStudent() {
    var searchUsername = prompt("Enter username:");
    if (!searchUsername) return

    this.usersService.getAllUsers().subscribe(
      users => {

        var found = false;
        users.forEach(user =>
        {
          if (user.username == searchUsername) {
            found = true;
            if (this.group.students.includes(user._id)) {
              alert(user.lastName + " " + user.firstName + " is already in group " + this.group.name);
              return;
            }
            var confirmed = confirm("Add " + user.lastName + " " + user.firstName + " to group " + this.group.name + "?");
            if (!confirmed) return;
            this.group.students.push(user._id);
            this.students.push(user);
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
            this.groupsService.updateGroupById(this.groupId, localStorage.getItem("currentToken"), this.group)
              .subscribe(group => {
                this.group = group;
              })
          }
        })
        if (!found) {
          alert("User not found.");
          return;
        }
      }
    )

  }

  //TODO: refresh after group deletion
  deleteGroup() {
    var del = confirm("Do you really want to delete this group?");
    if (!del) {
      return;
    }


    this.groupsService.deleteGroupById(this.groupId, localStorage.getItem("currentToken")).subscribe(
      group => {
        this.group = null;
        this.router.navigate(['/admin']);
      }
    )
  }
}
