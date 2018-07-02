import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { CoursePageComponent } from './components/course-page/course-page.component';
import { TaskPageComponent } from './components/task-page/task-page.component';
import {GroupPageComponent} from "./components/group-page/group-page.component";
import {AdminPageComponent} from "./components/admin-page/admin-page.component";
import {GroupEditPageComponent} from "./components/group-edit-page/group-edit-page.component";
const routes: Routes = [
  {
    path: 'admin', component: AdminPageComponent,
    children: [
      {path: 'group/:group_id', component: GroupEditPageComponent},
      { path: 'logout',   component: LogoutComponent}
    ]
  },
  {
    path: 'profile', component: ProfileComponent,
    children: [
      { path: 'courses',  component: CoursesComponent},
      { path: 'course/:course_id',   component: CoursePageComponent},
      { path: 'task/:task_id',   component: TaskPageComponent},
      { path: 'course/:course_id/:group_id',   component: GroupPageComponent},
      { path: 'logout',   component: LogoutComponent}
    ]
  },
  { path: '',       component: HomeComponent,
    children: [
      { path: 'signup', component: SignupComponent },

      { path: 'about',  component: AboutComponent },
      { path: '',       component: AboutComponent }
    ]},
];

@NgModule({
  exports: [RouterModule],

  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
