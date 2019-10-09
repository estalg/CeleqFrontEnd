import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private urlEndPoint = environment.backendUrl + '/upload';

  constructor(private httpClient: HttpClient) { }

  subirArchivo(datos, folder: string): Observable<any> {
    return this.httpClient.post<any>(`${this.urlEndPoint}/document?folder=` + folder, datos);
  }

  subirImagen(datos, folder: string): Observable<any> {
    return this.httpClient.post<any>(`${this.urlEndPoint}/image?folder=` + folder, datos);
  }
}
