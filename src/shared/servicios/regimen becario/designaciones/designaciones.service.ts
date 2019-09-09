import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EstudianteEntidad} from '../../../entidades/regimen becario/estudianteEntidad';

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
}
