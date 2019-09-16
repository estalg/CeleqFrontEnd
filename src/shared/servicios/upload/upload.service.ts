import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private urlEndPoint = environment.backendUrl + '/archivos';

  constructor(private httpClient: HttpClient) { }

  subirArchivo(datos, folder: string): Observable<any> {
    return this.httpClient.post<any>(`${this.urlEndPoint}/upload?folder=` + folder, datos);
  }
}
