import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class DocumentsService {
  url = 'http://localhost:3000/documents/';

  constructor(private http: HttpClient) {
  }

  addNewDocument(newDocument: any, token: string): Observable<any> {
    return this.http.post(this.url, newDocument);
  }

  getAllDocuments(token: string): Observable<any> {
    return (this.http.get(this.url, {
      headers: { 'x-access-token': token }}))
  }

  getDocumentById(id: string, token: string): Observable<any> {
    return (this.http.get(this.url + id, {
      headers: { 'x-access-token': token }}))
  }

  updateDocumentById(id: string, token: string, updatedDocument: any): Observable<any> {
    return (this.http.put(this.url + id, updatedDocument, {
      headers: { 'x-access-token': token }}))
  }

  deleteDocumentById(id: string, token: string): Observable<any> {
    return (this.http.delete(this.url + id, {
      headers: { 'x-access-token': token }}))
  }


  getDocumentForUser(userId: string, token: string): Observable<any> {
    return this.http.get('http://localhost:3000/documents/' + userId, {
      headers: { 'x-access-token': token }});
  }
}
