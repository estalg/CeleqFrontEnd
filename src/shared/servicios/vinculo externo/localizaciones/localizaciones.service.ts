import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { LocalizacionEntidad } from '../../../entidades/vinculo externo/localizacionEntidad';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionesService {

  private urlEndPoint = environment.backendUrl + '/vinculo externo/localizaciones';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {}

  consultar(): Observable<LocalizacionEntidad[]> {
    return this.http.get<LocalizacionEntidad[]>(this.urlEndPoint + '/consultar-localizaciones');
  }

  agregar(Localizacion: LocalizacionEntidad): Observable<LocalizacionEntidad> {
    return this.http.post<LocalizacionEntidad>(`${this.urlEndPoint}/agregar-localizaciones`, Localizacion, {headers: this.httpHeaders});
  }

  modificar(Localizacion: LocalizacionEntidad): Observable<LocalizacionEntidad> {
    return this.http.put<LocalizacionEntidad>(`${this.urlEndPoint}/editar-localizaciones`, Localizacion, {headers: this.httpHeaders});
  }

  eliminar(provincia: string, canton: string, localidad: string): Observable<LocalizacionEntidad> {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<LocalizacionEntidad>(`${this.urlEndPoint}/eliminar-localizaciones?provincia=` + provincia + `&canton=` + canton + `&localidad=` + localidad,
      {headers: this.httpHeaders});
  }

}
