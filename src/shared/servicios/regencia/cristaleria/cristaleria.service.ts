import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CristaleriaEntidad } from '../../../entidades/regencia/cristaleriaEntidad';

@Injectable({
  providedIn: 'root'
})
export class CristaleriaService {

  private urlEndPoint = environment.backendUrl + '/regencia/cristaleria';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient) { }

  consultar(): Observable<CristaleriaEntidad[]> {
    return this.http.get<CristaleriaEntidad[]>(this.urlEndPoint + '/consultar-cristaleria');
  }

  async consultarCristaleria(nombre: string, material: string, capacidad: string): Promise<any> {
    return this.http.get<CristaleriaEntidad>(`${this.urlEndPoint}/consultar-cristaleria-id?nombre=` + nombre + `&material=` + material
      + `&capacidad=` + capacidad).toPromise();
  }

  agregar(cristaleria: CristaleriaEntidad): Observable<CristaleriaEntidad> {
    return this.http.post<CristaleriaEntidad>(`${this.urlEndPoint}/agregar-cristaleria`, cristaleria, {headers: this.httpHeaders});
  }

  modificar(cristaleria: CristaleriaEntidad): Observable<CristaleriaEntidad> {
    return this.http.put<CristaleriaEntidad>(`${this.urlEndPoint}/editar-cristaleria`, cristaleria, {headers: this.httpHeaders});
  }

  eliminar(nombre: string, material: string, capacidad: string): Observable<CristaleriaEntidad> {
    return this.http.delete<CristaleriaEntidad>(`${this.urlEndPoint}/eliminar-cristaleria?nombre=` + nombre + `&material=` + material
      + `&capacidad=` + capacidad, {headers: this.httpHeaders});
  }
}
