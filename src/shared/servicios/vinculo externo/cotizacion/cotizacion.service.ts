import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CotizacionEntidad} from '../../../entidades/vinculo externo/cotizacionEntidad';
import {CotizacionAnalisisEntidad} from '../../../entidades/vinculo externo/cotizacionAnalisisEntidad';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private urlEndPoint = environment.backendUrl + '/cotizacion';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<CotizacionEntidad[]> {
    return this.http.get<CotizacionEntidad[]>(this.urlEndPoint);
  }

  async consultarCotizacion(id: number, anno: number): Promise<any> {
    return this.http.get<CotizacionEntidad>(`${this.urlEndPoint}/id?id=` + id + `&anno=` + anno).toPromise();
  }

  agregar(cotizacion: CotizacionEntidad): Observable<CotizacionEntidad> {
    return this.http.post<CotizacionEntidad>(`${this.urlEndPoint}`, cotizacion, {headers: this.httpHeaders});
  }

  modificar(cotizacion: CotizacionEntidad): Observable<CotizacionEntidad> {
    return this.http.post<CotizacionEntidad>(`${this.urlEndPoint}/editar`, cotizacion, {headers: this.httpHeaders});
  }

  agregarCotizacionAnalisis(cotAnalisis: CotizacionAnalisisEntidad): Observable<CotizacionAnalisisEntidad> {
    return this.http.post<CotizacionAnalisisEntidad>(`${this.urlEndPoint}/analisis`, cotAnalisis, {headers: this.httpHeaders});
  }

  // tslint:disable-next-line:max-line-length
  eliminarCotizacionAnalisis(idCotizacion: number, annoCotizacion: number, descripcion: string, tipoMuestra: string): Observable<CotizacionAnalisisEntidad> {
    return this.http.delete<CotizacionAnalisisEntidad>(`${this.urlEndPoint}?idCotizacion=` +
      idCotizacion + `&annoCotizacion=` + annoCotizacion + `&descripcion=` + descripcion +
      `&tipoMuestra=` + tipoMuestra, {headers: this.httpHeaders});
  }
}
