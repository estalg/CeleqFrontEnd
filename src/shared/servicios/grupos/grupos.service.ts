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
    return this.http.get<GrupoEntidad[]>(this.urlEndPoint + '/consultar-grupos');
  }

  agregar(grupo: GrupoEntidad) {
    return this.http.post<GrupoEntidad>(`${this.urlEndPoint}/agregar-grupo`, grupo, {headers: this.httpHeaders});
  }

  editar(grupo: GrupoEntidad) {
    return this.http.put<GrupoEntidad>(`${this.urlEndPoint}/editar-grupo`, grupo, {headers: this.httpHeaders});
  }

  eliminar(descripcion: string): Observable<GrupoEntidad> {
    return this.http.delete<GrupoEntidad>(`${this.urlEndPoint}/eliminar-grupo?descripcion=` + descripcion, {headers: this.httpHeaders});
  }

  consultarPermisos(): Observable<PermisoEntidad[]> {
    return this.http.get<PermisoEntidad[]>(this.urlEndPoint + '/consultar-permisos');
  }

  consultarPermisosGrupo(grupo: string): Observable<PermisoEntidad[]> {
    return this.http.get<PermisoEntidad[]>(`${this.urlEndPoint}/consultar-permisos-grupo?grupo=` + grupo);
  }

  consultarUsuariosGrupo(grupo: string): Observable<UsuarioEntidad[]> {
    return this.http.get<UsuarioEntidad[]>(`${this.urlEndPoint}/consultar-usuarios-grupo?grupo=` + grupo);
  }

  asignarUsuariosGrupo(grupo: GrupoEntidad) {
    return this.http.put<GrupoEntidad>(`${this.urlEndPoint}/asignar-usuarios-grupo`, grupo, {headers: this.httpHeaders});
  }
}
