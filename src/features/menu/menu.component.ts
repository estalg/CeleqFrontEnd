import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/servicios/seguridad/authentication.service';

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

  revisarPermiso(permiso: string) {
    return this.permisos.includes(permiso);
  }

}
