import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CoolStorageModule } from 'angular2-cool-storage';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login/login.service';
import { UserService } from './login/user.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
    HttpClientModule,
    CoolStorageModule
  ],
  providers: [LoginService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
