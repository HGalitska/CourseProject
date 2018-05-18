import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class CoursesService {
  url = 'http://localhost:3000/courses/';

  constructor(private http: HttpClient) {
  }

  addNewCourse(newCourse: any): Observable<any> {
    return this.http.post(this.url, newCourse);
  }

  getAllCourses(token: string): Observable<any> {
    return (this.http.get(this.url, {
      headers: { 'x-access-token': token }}))
  }

  getCourseById(id: string, token: string): Observable<any> {
    return (this.http.get(this.url + id, {
      headers: { 'x-access-token': token }}))
  }

  updateCourseById(id: string, token: string, updatedCourse: any): Observable<any> {
    return (this.http.put(this.url + id, updatedCourse, {
      headers: { 'x-access-token': token }}))
  }

  deleteCourseById(id: string, token: string): Observable<any> {
    return (this.http.delete(this.url + id, {
      headers: { 'x-access-token': token }}))
  }


  getCoursesForGroup(groupId: string, token: string): Observable<any> {
    return this.http.get('http://localhost:3000/courses/' + groupId, {
      headers: { 'x-access-token': token }});
  }

}
