import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UnidadEntidad} from '../../entidades/unidad/unidadEntidad';


@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  private urlEndPoint = environment.backendUrl + '/unidades';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<UnidadEntidad[]> {
    return this.http.get<UnidadEntidad[]>(this.urlEndPoint + '/consultar-unidades');
  }

  async consultarUnidad(nombre: string): Promise<any> {
    return this.http.get<UnidadEntidad>(`${this.urlEndPoint}/consultar-unidad-id?nombre=` + nombre).toPromise();
  }

  agregar(unidad: UnidadEntidad): Observable<UnidadEntidad> {
    return this.http.post<UnidadEntidad>(`${this.urlEndPoint}/agregar-unidades`, unidad, {headers: this.httpHeaders});
  }

  modificar(unidad: UnidadEntidad): Observable<UnidadEntidad> {
    return this.http.put<UnidadEntidad>(`${this.urlEndPoint}/editar-unidad`, unidad, {headers: this.httpHeaders});
  }
}
