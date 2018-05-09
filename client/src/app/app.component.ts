import { Component, OnInit } from '@angular/core';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  localStorage: CoolLocalStorage;

  title = 'app';

  constructor(localStorage: CoolLocalStorage) {
        this.localStorage = localStorage;
    }

    ngOnInit() {
    }
}
