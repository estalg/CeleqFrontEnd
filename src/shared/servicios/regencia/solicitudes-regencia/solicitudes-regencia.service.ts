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

  constructor(private http: HttpClient) {}

  consultar(): Observable<SolicitudRegenciaEntidad[]> {
    return this.http.get<SolicitudRegenciaEntidad[]>(this.urlEndPoint + '/consultar-solicitudes');
  }
}
