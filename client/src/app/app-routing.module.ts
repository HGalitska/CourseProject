import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { CoursesComponent } from './courses/courses.component';
import { ProgressComponent } from './progress/progress.component';
import { SettingsComponent } from './settings/settings.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  {
    path: 'profile', component: ProfileComponent,
    children: [
      { path: 'courses', component: CoursesComponent},
      { path: 'progress', component: ProgressComponent},
      { path: 'settings', component: SettingsComponent},
      { path: 'logout', component: LogoutComponent}
    ]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  exports: [RouterModule],

  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }