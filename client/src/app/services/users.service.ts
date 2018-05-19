import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class UsersService {
  url = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {
  }

  addNewUser(newUser: any, token: string): Observable<any> {
    return this.http.post(this.url, newUser);
  }

  getAllUsers(token: string): Observable<any> {
    return (this.http.get(this.url, {
      headers: { 'x-access-token': token }}))
  }

  getUserById(id: string, token: string): Observable<any> {
    return (this.http.get(this.url + id, {
      headers: { 'x-access-token': token }}))
  }

  updateUserById(id: string, token: string, updatedUser: any): Observable<any> {
    return (this.http.put(this.url + id, updatedUser, {
      headers: { 'x-access-token': token }}))
  }

  deleteUserById(id: string, token: string): Observable<any> {
    return (this.http.delete(this.url + id, {
      headers: { 'x-access-token': token }}))
  }

}
