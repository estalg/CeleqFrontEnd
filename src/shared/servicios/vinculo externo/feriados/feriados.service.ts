import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FeriadosEntidad} from '../../../entidades/vinculo externo/feriadosEntidad';

@Injectable({
  providedIn: 'root'
})
export class FeriadosService {

  private urlEndPoint = environment.backendUrl + '/feriados';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<FeriadosEntidad[]> {
    return this.http.get<FeriadosEntidad[]>(this.urlEndPoint);
  }

  async consultarFeriado(id: number): Promise<any> {
    return this.http.get<FeriadosEntidad>(`${this.urlEndPoint}/id?id=` + id).toPromise();
  }

  consultarSemanaSanta(): Observable<FeriadosEntidad[]> {
    return this.http.get<FeriadosEntidad[]>(`${this.urlEndPoint}/semanaSanta`);
  }

  async consultarSSid(): Promise<any> {
    return this.http.get<FeriadosEntidad>(`${this.urlEndPoint}/SS`).toPromise();
  }

  agregar(feriado: FeriadosEntidad): Observable<FeriadosEntidad> {
    return this.http.post<FeriadosEntidad>(`${this.urlEndPoint}`, feriado, {headers: this.httpHeaders});
  }

  modificar(feriado: FeriadosEntidad): Observable<FeriadosEntidad> {
    return this.http.post<FeriadosEntidad>(`${this.urlEndPoint}/editar`, feriado, {headers: this.httpHeaders});
  }

  modificarSemanaSanta(feriado: FeriadosEntidad): Observable<FeriadosEntidad> {
    return this.http.post<FeriadosEntidad>(`${this.urlEndPoint}/editarSS`, feriado, {headers: this.httpHeaders});
  }

  eliminar(id: number): Observable<FeriadosEntidad> {
    return this.http.delete<FeriadosEntidad>(`${this.urlEndPoint}?id=` + id, {headers: this.httpHeaders});
  }
}
