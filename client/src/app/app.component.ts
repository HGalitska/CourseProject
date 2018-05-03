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
        this.localStorage.setItem('itemKey', 'itemValue');

        console.log(this.localStorage.getItem('itemKey'));

        this.localStorage.setObject('itemKey', {
            someObject: 3
        });

        console.log(this.localStorage.getObject('itemKey'));
    }
}
