import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EstudianteEntidad} from '../../../entidades/regimen becario/estudianteEntidad';
import {P9Entidad} from '../../../entidades/regimen becario/p9Entidad';
import {DesignacionEntidad} from '../../../entidades/regimen becario/designacionEntidad';

@Injectable({
  providedIn: 'root'
})
export class DesignacionesService {

  private urlEndPoint = environment.backendUrl + '/regimen-becario/designaciones';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultarEstudiantes(): Observable<EstudianteEntidad[]> {
    return this.http.get<EstudianteEntidad[]>(this.urlEndPoint + '/consultar-estudiantes');
  }

  consultar(): Observable<DesignacionEntidad[]> {
    return this.http.get<DesignacionEntidad[]>(this.urlEndPoint + '/consultar-designaciones');
  }

  agregarDesignacion(designacion: P9Entidad): Observable<P9Entidad> {
    return this.http.post<P9Entidad>(`${this.urlEndPoint}/agregar-designacion`, designacion, {headers: this.httpHeaders});
  }
}
