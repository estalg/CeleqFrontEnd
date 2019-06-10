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
    return this.http.get<UsuarioEntidad[]>(this.urlEndPoint + '/consultar-usuarios');
  }

  async consultarUsuario(cedula: string): Promise<any> {
    return this.http.get<UsuarioEntidad>(`${this.urlEndPoint}/consultar-usuario-id?cedula=` + cedula).toPromise();
  }

  agregar(usuario: UsuarioEntidad): Observable<UsuarioEntidad> {
    return this.http.post<UsuarioEntidad>(`${this.urlEndPoint}/agregar-usuarios`, usuario, {headers: this.httpHeaders});
  }

  modificar(usuario: UsuarioEntidad): Observable<UsuarioEntidad> {
    return this.http.put<UsuarioEntidad>(`${this.urlEndPoint}/editar-usuarios`, usuario, {headers: this.httpHeaders});
  }

  eliminar(cedula: string): Observable<UsuarioEntidad> {
    return this.http.delete<UsuarioEntidad>(`${this.urlEndPoint}/eliminar-usuarios?cedula=` + cedula, {headers: this.httpHeaders});
  }
}
