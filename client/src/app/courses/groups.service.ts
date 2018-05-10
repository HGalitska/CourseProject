import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GroupsService {

  baseUrl: 'http://localhost:3000/groups';

  constructor(private http: HttpClient) {
  }

  getGroup(userId: string, token: string): Observable<any> {
    return this.http.get('http://localhost:3000/groups/' + userId, {
      headers: { 'x-access-token': token }});
  }
}
