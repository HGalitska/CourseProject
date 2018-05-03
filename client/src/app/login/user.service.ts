import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
  url = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {
  }

  show_user(id: string, token: string): Observable<any> {
    return (this.http.get('http://localhost:3000/users/' + id, {
      headers: { 'x-access-token': token }}))
  }

}
