import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
  url: string

  constructor(private http: Http) {
    this.url = 'http://localhost:3000/';
  }

  show_api() {
    return this.http.get(this.url).map(res => {
      return res.json()
    })
  }

}
