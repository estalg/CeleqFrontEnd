import { Component, OnInit } from '@angular/core';
import {DesignacionEntidad} from '../../../../shared/entidades/regimen becario/designacionEntidad';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DesignacionesService} from '../../../../shared/servicios/regimen becario/designaciones/designaciones.service';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-designaciones-listar',
  templateUrl: './designaciones-listar.component.html',
  styleUrls: ['./designaciones-listar.component.css']
})
export class DesignacionesListarComponent implements OnInit {

  designaciones: Array<DesignacionEntidad>;

  public displayedColumns: string[] = ['identificacion', 'estudiante', 'anno', 'ciclo', 'modalidad', 'carrera', 'encargado', 'acciones'];

  public dataSource = new MatTableDataSource<DesignacionEntidad>();

  constructor(public dialog: MatDialog,
              private designacionService: DesignacionesService) { }

  ngOnInit() {
    this.consultarDesignaciones();
  }

  private consultarDesignaciones = () => {
    this.designacionService.consultar().subscribe(
      designacion => {
        this.dataSource.data = designacion as DesignacionEntidad[];
        this.designaciones = this.dataSource.data;
      },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }
  private abrirDialogoAfirmacion(mensaje: string) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'afirmacion'}
      });
  }

}
