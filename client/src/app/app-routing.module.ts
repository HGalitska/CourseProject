import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutComponent } from './components/about/about.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { CoursePageComponent } from './components/course-page/course-page.component';

const routes: Routes = [
  {
    path: 'profile', component: ProfileComponent,
    children: [
      { path: 'courses',  component: CoursesComponent},
      { path: 'course/:course_id/:owner_id',   component: CoursePageComponent},
      { path: 'progress', component: ProgressComponent},
      { path: 'settings', component: SettingsComponent},
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
