import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SolicitudRegenciaEntidad} from '../../../entidades/regencia/solicitudRegenciaEntidad';
import {CristaleriaEntidad} from '../../../entidades/regencia/cristaleriaEntidad';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesRegenciaService {

  private urlEndPoint = environment.backendUrl + '/solicitudRegencia';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {}

  consultar(): Observable<SolicitudRegenciaEntidad[]> {
    return this.http.get<SolicitudRegenciaEntidad[]>(this.urlEndPoint);
  }

  async consultarSolicitud(idSolicitud: string, annoSolicitud: string): Promise<any>  {
    return this.http.get<SolicitudRegenciaEntidad>(`${this.urlEndPoint}/id?idSolicitud=` + idSolicitud +
      `&annoSolicitud=` + annoSolicitud).toPromise();
  }

  consultarPendientes(): Observable<SolicitudRegenciaEntidad[]> {
    return this.http.get<SolicitudRegenciaEntidad[]>(this.urlEndPoint + '/pendientes');
  }

  consultarSolicitudesUsuario(cedulaUsuario: string): Observable<SolicitudRegenciaEntidad[]> {
    return this.http.get<SolicitudRegenciaEntidad[]>(`${this.urlEndPoint}/usuario?cedula=` + cedulaUsuario,
      {headers: this.httpHeaders});
  }

  agregarSolicitud(solicitud: SolicitudRegenciaEntidad): Observable<SolicitudRegenciaEntidad> {
    return this.http.post<SolicitudRegenciaEntidad>(`${this.urlEndPoint}`, solicitud, {headers: this.httpHeaders});
  }

  modificarSolicitud(solicitud: SolicitudRegenciaEntidad): Observable<SolicitudRegenciaEntidad> {
    return this.http.post<SolicitudRegenciaEntidad>(`${this.urlEndPoint}/editar`, solicitud, {headers: this.httpHeaders});
  }
}
