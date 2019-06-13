import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReactivoEntidad} from '../../../entidades/regencia/reactivoEntidad';

@Injectable({
  providedIn: 'root'
})
export class ReactivosService {

  private urlEndPoint = environment.backendUrl + '/regencia/reactivos';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {}

  consultar(): Observable<ReactivoEntidad[]> {
    return this.http.get<ReactivoEntidad[]>(this.urlEndPoint + '/consultar-reactivos');
  }

  async consultarReactivo(nombre: string, pureza: string): Promise<any> {
    return this.http.get<ReactivoEntidad>(`${this.urlEndPoint}/consultar-reactivos-id?nombre=` + nombre + `&pureza=` + pureza).toPromise();
  }

  agregar(Reactivo: ReactivoEntidad): Observable<ReactivoEntidad> {
    return this.http.post<ReactivoEntidad>(`${this.urlEndPoint}/agregar-reactivos`, Reactivo, {headers: this.httpHeaders});
  }

  modificar(Reactivo: ReactivoEntidad): Observable<ReactivoEntidad> {
    return this.http.put<ReactivoEntidad>(`${this.urlEndPoint}/editar-reactivos`, Reactivo, {headers: this.httpHeaders});
  }

  eliminar(nombre: string, pureza: string): Observable<ReactivoEntidad> {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<ReactivoEntidad>(`${this.urlEndPoint}/eliminar-reactivos?nombre=` + nombre + `&pureza=` + pureza, {headers: this.httpHeaders});
  }
}
