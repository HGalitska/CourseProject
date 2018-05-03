import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  baseUrl: 'http://localhost:3000/authenticate';

  constructor(private http: HttpClient) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = { username: username, password: password };
    return this.http.post('http://localhost:3000/authenticate', credentials);
  }
}
