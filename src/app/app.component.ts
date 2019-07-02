import { Component } from '@angular/core';
import {UsuarioEntidad} from '../shared/entidades/usuarioEntidad';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/servicios/seguridad/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'celeqFrontEnd';
  currentUser: UsuarioEntidad;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }
}
