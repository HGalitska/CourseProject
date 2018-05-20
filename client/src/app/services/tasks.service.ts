import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class TasksService {
  url = 'http://localhost:3000/tasks/';

  constructor(private http: HttpClient) {
  }

  addNewTask(newTask: any, token: string): Observable<any> {
    return this.http.post(this.url, newTask, {
      headers: { 'x-access-token': token }});
  }

  getAllTasks(token: string): Observable<any> {
    return (this.http.get(this.url, {
      headers: { 'x-access-token': token }}))
  }

  getTaskById(id: string, token: string): Observable<any> {
    return (this.http.get(this.url + id, {
      headers: { 'x-access-token': token }}))
  }

  updateTaskById(id: string, token: string, updatedTask: any): Observable<any> {
    return (this.http.put(this.url + id, updatedTask, {
      headers: { 'x-access-token': token }}))
  }

  deleteTaskById(id: string, token: string): Observable<any> {
    return (this.http.delete(this.url + id, {
      headers: { 'x-access-token': token }}))
  }


  getTaskForUser(userId: string, token: string): Observable<any> {
    return this.http.get('http://localhost:3000/tasks/' + userId, {
      headers: { 'x-access-token': token }});
  }
}
