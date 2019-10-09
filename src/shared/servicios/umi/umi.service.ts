import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SolicitudUmiEntidad} from '../../entidades/umi/solicitudUmiEntidad';

@Injectable({
  providedIn: 'root'
})
export class UmiService {

  private urlEndPoint = environment.backendUrl + '/solicitudMantenimiento';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  agregarSolicitud(solicitud: SolicitudUmiEntidad): Observable<SolicitudUmiEntidad> {
    return this.http.post<SolicitudUmiEntidad>(`${this.urlEndPoint}`, solicitud, {headers: this.httpHeaders});
  }

  consultar(): Observable<SolicitudUmiEntidad[]> {
    return this.http.get<SolicitudUmiEntidad[]>(this.urlEndPoint);
  }

  consultarPendientes(): Observable<SolicitudUmiEntidad[]> {
    return this.http.get<SolicitudUmiEntidad[]>(this.urlEndPoint + '/pendientes');
  }

  consultarAnalizadas(cedula: string): Observable<SolicitudUmiEntidad[]> {
    return this.http.get<SolicitudUmiEntidad[]>(this.urlEndPoint + '/analizadas?cedula=' + cedula);
  }

  consultarAprobadas(cedula: string): Observable<SolicitudUmiEntidad[]> {
    return this.http.get<SolicitudUmiEntidad[]>(this.urlEndPoint + '/aprobadas?cedula=' + cedula);
  }

  finalizarSolicitud(solicitud: SolicitudUmiEntidad): Observable<SolicitudUmiEntidad> {
    return this.http.post<SolicitudUmiEntidad>(`${this.urlEndPoint}/finalizar`, solicitud, {headers: this.httpHeaders});
  }

  async consultarSolicitud(idSolicitud: string, annoSolicitud: string): Promise<any>  {
    return this.http.get<SolicitudUmiEntidad>(`${this.urlEndPoint}/id?id=` + idSolicitud +
      `&anno=` + annoSolicitud).toPromise();
  }

  aprobarSolicitud(solicitud: SolicitudUmiEntidad): Observable<SolicitudUmiEntidad> {
    return this.http.post<SolicitudUmiEntidad>(`${this.urlEndPoint}/aprobar`, solicitud, {headers: this.httpHeaders});
  }

  analizarSolicitud(solicitud: SolicitudUmiEntidad): Observable<SolicitudUmiEntidad> {
    return this.http.post<SolicitudUmiEntidad>(`${this.urlEndPoint}/analizar`, solicitud, {headers: this.httpHeaders});
  }
}
