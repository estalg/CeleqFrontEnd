import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReactivoEntidad} from '../../../entidades/regencia/reactivoEntidad';

@Injectable({
  providedIn: 'root'
})
export class ReactivosService {

  private urlEndPoint = environment.backendUrl + '/reactivo';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {}

  consultar(): Observable<ReactivoEntidad[]> {
    return this.http.get<ReactivoEntidad[]>(this.urlEndPoint);
  }

  async consultarReactivo(nombre: string, pureza: string): Promise<any> {
    return this.http.get<ReactivoEntidad>(`${this.urlEndPoint}/id?nombre=` + nombre + `&pureza=` + pureza).toPromise();
  }

  agregar(Reactivo: ReactivoEntidad): Observable<ReactivoEntidad> {
    return this.http.post<ReactivoEntidad>(`${this.urlEndPoint}`, Reactivo, {headers: this.httpHeaders});
  }

  modificar(Reactivo: ReactivoEntidad): Observable<ReactivoEntidad> {
    return this.http.post<ReactivoEntidad>(`${this.urlEndPoint}/editar`, Reactivo, {headers: this.httpHeaders});
  }

  eliminar(nombre: string, pureza: string): Observable<ReactivoEntidad> {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<ReactivoEntidad>(`${this.urlEndPoint}?nombre=` + nombre + `&pureza=` + pureza, {headers: this.httpHeaders});
  }
}
