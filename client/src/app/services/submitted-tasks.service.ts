import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class SubmittedTasksService {
  url = 'http://localhost:3000/submittedTasks/';

  constructor(private http: HttpClient) {
  }

  addNewSubmittedTask(newSubmittedTask: any, token: string): Observable<any> {
    return this.http.post(this.url, newSubmittedTask, {
      headers: { 'x-access-token': token }})
  }

  getAllSubmittedTasks(token: string): Observable<any> {
    return (this.http.get(this.url, {
    headers: { 'x-access-token': token }}))
  }

  getSubmittedTaskById(id: string, token: string): Observable<any> {
    return (this.http.get(this.url + id, {
      headers: { 'x-access-token': token }}))
  }

  updateSubmittedTaskById(id: string, token: string, updatedSubmittedTask: any): Observable<any> {
    return (this.http.put(this.url + id, updatedSubmittedTask, {
      headers: { 'x-access-token': token }}))
  }

  deleteSubmittedTaskById(id: string, token: string): Observable<any> {
    return (this.http.delete(this.url + id, {
      headers: { 'x-access-token': token }}))
  }
}
