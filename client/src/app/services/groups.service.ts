import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class GroupsService {
  url = 'http://localhost:3000/groups/';

  constructor(private http: HttpClient) {
  }

  addNewGroup(newGroup: any, token: string): Observable<any> {
    return this.http.post(this.url, newGroup, {
      headers: {'x-access-token': token}
    });
  }

  getAllGroups(token: string): Observable<any> {
    return (this.http.get(this.url, {
      headers: {'x-access-token': token}
    }))
  }

  getGroupById(id: string, token: string): Observable<any> {
    return (this.http.get(this.url + id, {
      headers: {'x-access-token': token}
    }))
  }

  updateGroupById(id: string, token: string, updatedGroup: any): Observable<any> {
    return (this.http.put(this.url + id, updatedGroup, {
      headers: {'x-access-token': token}
    }))
  }

  deleteGroupById(id: string, token: string): Observable<any> {
    return (this.http.delete(this.url + id, {
      headers: {'x-access-token': token}
    }))
  }
}
