import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/servicios/seguridad/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  permisos: string[];
  ngOnInit() {
    this.permisos = this.authService.getPermisos();
  }

  logout() {
    this.authService.logout();
  }

  revisarPermiso(permiso: string) {
    return this.permisos.includes(permiso);
  }
}
