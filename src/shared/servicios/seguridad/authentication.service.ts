import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as jwt_decode from 'jwt-decode';

import { UsuarioEntidad } from '../../entidades/usuarioEntidad';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private urlEndPoint = environment.backendUrl + '/seguridad';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  private currentUserSubject: BehaviorSubject<UsuarioEntidad>;
  public currentUser: Observable<UsuarioEntidad>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UsuarioEntidad>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UsuarioEntidad {
    return this.currentUserSubject.value;
  }

  login(username, pass) {
    const datos = {
      cedula: username,
      password: pass
    };
    console.log(datos);
    return this.http.post<any>(`${this.urlEndPoint}/authenticate`, datos, {headers: this.httpHeaders})
      .pipe(map(user => {
        console.log(user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCedula() {
    const datosToken = jwt_decode(JSON.parse(localStorage.getItem('currentUser')).token);
    return datosToken.cedula;
  }
}