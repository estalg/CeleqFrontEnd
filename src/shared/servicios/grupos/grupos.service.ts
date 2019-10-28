import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GrupoEntidad} from '../../entidades/grupoEntidad';
import {UsuarioEntidad} from '../../entidades/usuarioEntidad';
import {PermisoEntidad} from '../../entidades/permisoEntidad';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private urlEndPoint = environment.backendUrl + '/grupos';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<GrupoEntidad[]> {
    return this.http.get<GrupoEntidad[]>(this.urlEndPoint);
  }

  agregar(grupo: GrupoEntidad) {
    return this.http.post<GrupoEntidad>(`${this.urlEndPoint}`, grupo, {headers: this.httpHeaders});
  }

  editar(grupo: GrupoEntidad) {
    return this.http.post<GrupoEntidad>(`${this.urlEndPoint}/editar`, grupo, {headers: this.httpHeaders});
  }

  eliminar(descripcion: string): Observable<GrupoEntidad> {
    return this.http.delete<GrupoEntidad>(`${this.urlEndPoint}?descripcion=` + descripcion, {headers: this.httpHeaders});
  }

  consultarPermisos(): Observable<PermisoEntidad[]> {
    return this.http.get<PermisoEntidad[]>(this.urlEndPoint + '/permisos');
  }

  consultarPermisosGrupo(grupo: string): Observable<PermisoEntidad[]> {
    return this.http.get<PermisoEntidad[]>(`${this.urlEndPoint}/permisosgrupo?grupo=` + grupo);
  }

  consultarUsuariosGrupo(grupo: string): Observable<UsuarioEntidad[]> {
    return this.http.get<UsuarioEntidad[]>(`${this.urlEndPoint}/usuarios?grupo=` + grupo);
  }

  asignarUsuariosGrupo(grupo: GrupoEntidad) {
    return this.http.post<GrupoEntidad>(`${this.urlEndPoint}/asignarusuario`, grupo, {headers: this.httpHeaders});
  }
}
