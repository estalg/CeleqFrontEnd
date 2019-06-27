import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SolicitudRegenciaEntidad} from '../../../entidades/regencia/solicitudRegenciaEntidad';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesRegenciaService {

  private urlEndPoint = environment.backendUrl + '/regencia/solicitudes';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {}

  consultar(): Observable<SolicitudRegenciaEntidad[]> {
    return this.http.get<SolicitudRegenciaEntidad[]>(this.urlEndPoint + '/consultar-solicitudes');
  }

  consultarPendientes(): Observable<SolicitudRegenciaEntidad[]> {
    return this.http.get<SolicitudRegenciaEntidad[]>(this.urlEndPoint + '/consultar-solicitudes-pendientes');
  }

  agregarSolicitud(solicitud: SolicitudRegenciaEntidad): Observable<SolicitudRegenciaEntidad> {
    return this.http.post<SolicitudRegenciaEntidad>(`${this.urlEndPoint}/agregar-solicitud`, solicitud, {headers: this.httpHeaders});
  }
}
