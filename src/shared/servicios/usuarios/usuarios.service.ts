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
}
