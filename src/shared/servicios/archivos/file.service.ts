import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private urlEndPoint = environment.backendUrl;
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  downloadDocument(url: string): Observable<any> {
    return this.http.get(this.urlEndPoint + '/downloadDocument?url=' + url, {headers: this.httpHeaders, responseType: 'blob' as 'json'});
  }
}
