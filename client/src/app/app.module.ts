import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CoolStorageModule } from 'angular2-cool-storage';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login/login.service';
import { SignupService } from './signup/signup.service';
import { UserService } from './login/user.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    CoolStorageModule,
    AppRoutingModule
  ],
  providers: [LoginService, SignupService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
