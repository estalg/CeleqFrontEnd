import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArancelEntidad} from '../../../entidades/regimen becario/arancelEntidad';

@Injectable({
  providedIn: 'root'
})
export class ArancelesService {
  private urlEndPoint = environment.backendUrl + '/arancel';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<ArancelEntidad[]> {
    return this.http.get<ArancelEntidad[]>(this.urlEndPoint);
  }

  modificar(arancel: ArancelEntidad): Observable<ArancelEntidad> {
    return this.http.post<ArancelEntidad>(`${this.urlEndPoint}/editar`, arancel, {headers: this.httpHeaders});
  }
}
