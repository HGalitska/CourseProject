import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ProfileService {
  url = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {
  }

  getUser(id: string, token: string): Observable<any> {
    return (this.http.get('http://localhost:3000/users/' + id, {
      headers: { 'x-access-token': token }}))
  }

}
