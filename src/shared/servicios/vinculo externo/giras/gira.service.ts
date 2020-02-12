import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GiraEntidad} from '../../../entidades/vinculo externo/giraEntidad';

@Injectable({
  providedIn: 'root'
})
export class GiraService {

  private urlEndPoint = environment.backendUrl + '/giras';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  agregar(gira: GiraEntidad) {
    return this.http.post<GiraEntidad>(`${this.urlEndPoint}`, gira, {headers: this.httpHeaders});
  }

  async consultarGiraCotizacion(idCotizacion: number, annoCotizacion: number): Promise<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<GiraEntidad>(`${this.urlEndPoint}/cotizacion?idCotizacion=` + idCotizacion + `&annoCotizacion=` + annoCotizacion).toPromise();
  }
}
