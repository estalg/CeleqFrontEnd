import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PresupuestoEntidad} from '../../../entidades/regimen becario/PresupuestoEntidad';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  private urlEndPoint = environment.backendUrl + '/regimen-becario/presupuesto';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) {}

  consultar(): Observable<PresupuestoEntidad[]> {
    return this.http.get<PresupuestoEntidad[]>(this.urlEndPoint + '/consultar-presupuesto');
  }

  agregar(Presupuesto: PresupuestoEntidad): Observable<PresupuestoEntidad> {
    return this.http.post<PresupuestoEntidad>(`${this.urlEndPoint}/agregar-presupuesto`, Presupuesto, {headers: this.httpHeaders});
  }

  async consultarReactivo(codigo: string): Promise<any> {
    return this.http.get<PresupuestoEntidad>(`${this.urlEndPoint}/consultar-presupuesto-id?codigo=` + codigo).toPromise();
  }

  modificar(Presupuesto: PresupuestoEntidad): Observable<PresupuestoEntidad> {
    return this.http.put<PresupuestoEntidad>(`${this.urlEndPoint}/editar-presupuesto`, Presupuesto, {headers: this.httpHeaders});
  }

  eliminar(codigo: string): Observable<PresupuestoEntidad> {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<PresupuestoEntidad>(`${this.urlEndPoint}/eliminar-presupuesto?codigo=` + codigo, {headers: this.httpHeaders});
  }
}
