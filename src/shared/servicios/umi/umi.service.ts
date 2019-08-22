import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SolicitudUmiEntidad} from '../../entidades/umi/solicitudUmiEntidad';

@Injectable({
  providedIn: 'root'
})
export class UmiService {

  private urlEndPoint = environment.backendUrl + '/umi';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  agregarSolicitud(solicitud: SolicitudUmiEntidad): Observable<SolicitudUmiEntidad> {
    console.log(solicitud);
    return this.http.post<SolicitudUmiEntidad>(`${this.urlEndPoint}/agregar-solicitud`, solicitud, {headers: this.httpHeaders});
  }

  async consultarSolicitudesPendientes(id: number, anno: number): Promise<any> {

  }
}
