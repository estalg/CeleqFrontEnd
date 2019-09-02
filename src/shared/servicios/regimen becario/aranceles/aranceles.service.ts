import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArancelEntidad} from '../../../entidades/regimen becario/arancelEntidad';

@Injectable({
  providedIn: 'root'
})
export class ArancelesService {
  private urlEndPoint = environment.backendUrl + '/regimen becario/aranceles';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<ArancelEntidad[]> {
    return this.http.get<ArancelEntidad[]>(this.urlEndPoint + '/consultar-aranceles');
  }

  modificar(arancel: ArancelEntidad): Observable<ArancelEntidad> {
    return this.http.put<ArancelEntidad>(`${this.urlEndPoint}/editar-aranceles`, arancel, {headers: this.httpHeaders});
  }
}
