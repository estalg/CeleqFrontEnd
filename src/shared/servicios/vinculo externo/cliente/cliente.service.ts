import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClienteEntidad} from '../../../entidades/vinculo externo/clienteEntidad';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint = environment.backendUrl + '/clientes';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<ClienteEntidad[]> {
    return this.http.get<ClienteEntidad[]>(this.urlEndPoint);
  }

  async consultarCliente(nombre: string): Promise<any> {
    return this.http.get<ClienteEntidad>(`${this.urlEndPoint}/id?nombre=` + nombre).toPromise();
  }

  agregar(cliente: ClienteEntidad): Observable<ClienteEntidad> {
    return this.http.post<ClienteEntidad>(`${this.urlEndPoint}`, cliente, {headers: this.httpHeaders});
  }

  modificar(cliente: ClienteEntidad, nombreViejo: string): Observable<ClienteEntidad> {
    return this.http.post<ClienteEntidad>(`${this.urlEndPoint}/editar?nombreViejo=` + nombreViejo, cliente, {headers: this.httpHeaders});
  }

}
