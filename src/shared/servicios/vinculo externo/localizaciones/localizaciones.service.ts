import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LocalizacionEntidad} from '../../../entidades/vinculo externo/localizacionEntidad';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {

  private urlEndPoint = environment.backendUrl + '/localizaciones';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<LocalizacionEntidad[]> {
    return this.http.get<LocalizacionEntidad[]>(this.urlEndPoint);
  }

  async consultarLocalizacion(provincia: string, canton: string, localidad: string): Promise<any> {
    return this.http.get<LocalizacionEntidad>(`${this.urlEndPoint}/id?provincia=` + provincia + `&canton=` + canton
      + `&localidad=` + localidad).toPromise();
  }

  agregar(localizacion: LocalizacionEntidad): Observable<LocalizacionEntidad> {
    return this.http.post<LocalizacionEntidad>(`${this.urlEndPoint}`, localizacion, {headers: this.httpHeaders});
  }

  modificar(localizacion: LocalizacionEntidad): Observable<LocalizacionEntidad> {
    return this.http.post<LocalizacionEntidad>(`${this.urlEndPoint}/editar`, localizacion, {headers: this.httpHeaders});
  }

  eliminar(provincia: string, canton: string, localidad: string): Observable<LocalizacionEntidad> {
    return this.http.delete<LocalizacionEntidad>(`${this.urlEndPoint}?provincia=` + provincia + `&canton=` + canton
      + `&localidad=` + localidad, {headers: this.httpHeaders});
  }

  consultarProvincias(): Observable<LocalizacionEntidad[]> {
    return this.http.get<LocalizacionEntidad[]>(`${this.urlEndPoint}/provincias`);
  }

  filtarProvincia(provincia: string): Observable<LocalizacionEntidad[]> {
    return this.http.get<LocalizacionEntidad[]>(`${this.urlEndPoint}/provincia?provincia=` + provincia);
  }

  filtarCanton(canton: string): Observable<LocalizacionEntidad[]> {
    return this.http.get<LocalizacionEntidad[]>(`${this.urlEndPoint}/canton?canton=` + canton);
  }
}
