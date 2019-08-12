import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/servicios/seguridad/authentication.service';
import {element} from 'protractor';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  permisos: string[];
  ngOnInit() {
    this.permisos = this.authService.getPermisos();
  }

  // Retorna verdadero si cumple el permiso
  revisarPermiso(permiso: string) {
    return this.permisos.includes(permiso);
  }

  // Retorna verdadero si cumple al menos un permiso
  revisarAlgunPermiso(permisos: string[]) {
    for (let i = 0; i < permisos.length; ++i) {
      if (this.permisos.includes(permisos[i])) {
        return true;
      }
    }
    return false;
  }
}
