import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CoursesService {

  baseUrl: 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {
  }

  getCourses(groupId: string, token: string): Observable<any> {
    return this.http.get('http://localhost:3000/courses/group/' + groupId, {
      headers: { 'x-access-token': token }});
  }
}
