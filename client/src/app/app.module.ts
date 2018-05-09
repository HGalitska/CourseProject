import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CoolStorageModule } from 'angular2-cool-storage';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login/login.service';
import { SignupService } from './signup/signup.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { ProfileService } from './profile/profile.service';
import { CoursesComponent } from './courses/courses.component';
import { ProgressComponent } from './progress/progress.component';
import { SettingsComponent } from './settings/settings.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    AboutComponent,
    CoursesComponent,
    ProgressComponent,
    SettingsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    CoolStorageModule,
    AppRoutingModule
  ],
  providers: [LoginService, SignupService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
