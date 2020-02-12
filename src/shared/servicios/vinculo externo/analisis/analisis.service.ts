import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AnalisisEntidad} from '../../../entidades/vinculo externo/analisisEntidad';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  private urlEndPoint = environment.backendUrl + '/analisis';
  private urlEndPoint2 = environment.backendUrl + '/tipoMuestra'
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<AnalisisEntidad[]> {
    return this.http.get<AnalisisEntidad[]>(this.urlEndPoint);
  }

  async consultarAnalisis(descripcion: string, tipoMuestra: string): Promise<any> {
    return this.http.get<AnalisisEntidad>(`${this.urlEndPoint}/id?descripcion=` + descripcion + `&tipoMuestra=` + tipoMuestra).toPromise();
  }

  agregar(analisis: AnalisisEntidad): Observable<AnalisisEntidad> {
    return this.http.post<AnalisisEntidad>(`${this.urlEndPoint}`, analisis, {headers: this.httpHeaders});
  }

  modificar(analisis: AnalisisEntidad): Observable<AnalisisEntidad> {
    return this.http.post<AnalisisEntidad>(`${this.urlEndPoint}/editar`, analisis, {headers: this.httpHeaders});
  }

  filtrar_tipo(tipoMuestra: string): Observable<AnalisisEntidad[]> {
    return this.http.get<AnalisisEntidad[]>(`${this.urlEndPoint}/tipoMuestra?tipoMuestra=` + tipoMuestra);
  }

  eliminar(descripcion: string, tipoMuestra: string): Observable<AnalisisEntidad> {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<AnalisisEntidad>(`${this.urlEndPoint}?descripcion=` + descripcion + `&tipoMuestra=` + tipoMuestra, {headers: this.httpHeaders});
  }

  consultar_tipoMuestra(): Observable<AnalisisEntidad[]> {
    return this.http.get<AnalisisEntidad[]>(this.urlEndPoint2);
  }

  agregar_tipoMuestra(analisis: AnalisisEntidad): Observable<AnalisisEntidad> {
    return this.http.post<AnalisisEntidad>(`${this.urlEndPoint2}`, analisis, {headers: this.httpHeaders});
  }

  eliminar_tipoMuestra(tipo: string): Observable<AnalisisEntidad> {
    return this.http.delete<AnalisisEntidad>(`${this.urlEndPoint2}?tipo=` + tipo, {headers: this.httpHeaders});
  }
}
