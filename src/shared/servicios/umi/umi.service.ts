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
    return this.http.post<SolicitudUmiEntidad>(`${this.urlEndPoint}/agregar-solicitud`, solicitud, {headers: this.httpHeaders});
  }

  consultar(): Observable<SolicitudUmiEntidad[]> {
    return this.http.get<SolicitudUmiEntidad[]>(this.urlEndPoint + '/consultar-solicitudes');
  }

  consultarPendientes(): Observable<SolicitudUmiEntidad[]> {
    return this.http.get<SolicitudUmiEntidad[]>(this.urlEndPoint + '/consultar-pendientes');
  }

  consultarAnalizadas(cedula: string): Observable<SolicitudUmiEntidad[]> {
    return this.http.get<SolicitudUmiEntidad[]>(this.urlEndPoint + '/consultar-solicitudes-analizadas?cedula=' + cedula);
  }

  consultarAprobadas(cedula: string): Observable<SolicitudUmiEntidad[]> {
    return this.http.get<SolicitudUmiEntidad[]>(this.urlEndPoint + '/consultar-solicitudes-aprobadas?cedula=' + cedula);
  }

  finalizarSolicitud(solicitud: SolicitudUmiEntidad): Observable<SolicitudUmiEntidad> {
    return this.http.post<SolicitudUmiEntidad>(`${this.urlEndPoint}/finalizar-solicitud`, solicitud, {headers: this.httpHeaders});
  }
}
