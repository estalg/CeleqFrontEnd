import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {precioGirasEntidad} from '../../../entidades/vinculo externo/precioGirasEntidad';

@Injectable({
  providedIn: 'root'
})
export class precioGirasService {
  private urlEndPoint = environment.backendUrl + '/precioGiras';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<precioGirasEntidad[]> {
    return this.http.get<precioGirasEntidad[]>(this.urlEndPoint);
  }

  modificar(precio: precioGirasEntidad): Observable<precioGirasEntidad> {
    return this.http.post<precioGirasEntidad>(`${this.urlEndPoint}/editar`, precio, {headers: this.httpHeaders});
  }
}
