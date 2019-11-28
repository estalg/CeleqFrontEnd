import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/servicios/seguridad/authentication.service';
import {element} from 'protractor';
import {FiltrarReporteComponent} from '../regimen-becario/reportes/filtrar-reporte/filtrar-reporte.component';
import {MatDialog} from '@angular/material';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              public dialog: MatDialog) { }

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
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < permisos.length; ++i) {
      if (this.permisos.includes(permisos[i])) {
        return true;
      }
    }
    return false;
  }

  private abrirDialogoFiltroReporteDesignaciones() {
      const dialogRef = this.dialog.open(FiltrarReporteComponent,
      {
        width: '600px'
      });
  }

  private  abrirReporteCristaleria() {
    window.open(environment.backendUrl + '/cristaleria/reporte', '_blank');
  }

  private  abrirReporteReactivo() {
    window.open(environment.backendUrl + '/reactivo/reporte', '_blank');
  }

}
