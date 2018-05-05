import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SignupService {

  baseUrl: 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  attemptSignup(newUser: any): Observable<any> {
    return this.http.post('http://localhost:3000/users', newUser);
  }
}
