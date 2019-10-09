import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsuarioEntidad} from '../../entidades/usuarioEntidad';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlEndPoint = environment.backendUrl + '/usuarios';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<UsuarioEntidad[]> {
    return this.http.get<UsuarioEntidad[]>(this.urlEndPoint);
  }

  async consultarUsuario(cedula: string): Promise<any> {
    return this.http.get<UsuarioEntidad>(`${this.urlEndPoint}/id?cedula=` + cedula).toPromise();
  }

  consultarPorGrupo(grupo: string): Observable<UsuarioEntidad[]> {
    return this.http.get<UsuarioEntidad[]>(`${this.urlEndPoint}/grupos?grupo=` + grupo);
  }

  agregar(usuario: UsuarioEntidad): Observable<UsuarioEntidad> {
    return this.http.post<UsuarioEntidad>(this.urlEndPoint, usuario, {headers: this.httpHeaders});
  }

  modificar(usuario: UsuarioEntidad): Observable<UsuarioEntidad> {
    return this.http.post<UsuarioEntidad>(`${this.urlEndPoint}/editar`, usuario, {headers: this.httpHeaders});
  }

  eliminar(cedula: string): Observable<UsuarioEntidad> {
    return this.http.delete<UsuarioEntidad>(`${this.urlEndPoint}?cedula=` + cedula, {headers: this.httpHeaders});
  }
}
