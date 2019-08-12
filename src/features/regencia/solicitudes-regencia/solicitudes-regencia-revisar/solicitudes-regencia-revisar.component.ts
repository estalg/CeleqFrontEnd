import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {SolicitudRegenciaEntidad} from '../../../../shared/entidades/regencia/solicitudRegenciaEntidad';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {
  DatosDialog,
  DialogoConfirmacionComponent
} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {SolicitudesRegenciaService} from '../../../../shared/servicios/regencia/solicitudes-regencia/solicitudes-regencia.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReactivoEntidad} from '../../../../shared/entidades/regencia/reactivoEntidad';
import {CristaleriaEntidad} from '../../../../shared/entidades/regencia/cristaleriaEntidad';
import {SelectionModel} from '@angular/cdk/collections';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-solicitudes-regencia-revisar',
  templateUrl: './solicitudes-regencia-revisar.component.html',
  styleUrls: ['./solicitudes-regencia-revisar.component.css']
})
export class SolicitudesRegenciaRevisarComponent implements OnInit {

  private solicitud: SolicitudRegenciaEntidad;
  private formSolicitud: FormGroup;
  public reactivosColumns: string[] = ['select', 'nombre', 'pureza', 'cantidad', 'justificacion'];
  public cristaleriaColumns: string[] = ['select', 'nombre', 'material', 'capacidad', 'cantidad', 'justificacion'];
  public dataSourceReactivos = new MatTableDataSource<ReactivoEntidad>();
  public dataSourceCristaleria = new MatTableDataSource<CristaleriaEntidad>();
  selectionReactivo = new SelectionModel<ReactivoEntidad>(true, []);
  selectionCristaleria = new SelectionModel<CristaleriaEntidad>(true, []);

  constructor(private solicitudesRegenciaService: SolicitudesRegenciaService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.solicitud = new SolicitudRegenciaEntidad();

    this.formSolicitud = this.fb.group({
      nombreSolicitante: [''],
      correoSolicitante: [''],
      nombreEncargado: [''],
      observaciones: ['']
    });

    this.solicitudesRegenciaService.consultarSolicitud(this.route.snapshot.params.id, this.route.snapshot.params.anno).then(res => {
      console.log(res);
      this.solicitud = res;
      this.formSolicitud.controls.nombreSolicitante.setValue(this.solicitud.nombreSolicitante);
      this.formSolicitud.controls.correoSolicitante.setValue(this.solicitud.correoSolicitante);
      this.formSolicitud.controls.nombreEncargado.setValue(this.solicitud.nombreEncargado);
      this.formSolicitud.controls.observaciones.setValue(this.solicitud.observacion);
      this.formSolicitud.controls.nombreSolicitante.disable();
      this.formSolicitud.controls.correoSolicitante.disable();
      this.formSolicitud.controls.nombreEncargado.disable();
      this.formSolicitud.controls.observaciones.disable();
      this.dataSourceReactivos.data = this.solicitud.reactivosSolicitados;
      this.dataSourceCristaleria.data = this.solicitud.cristaleriaSolicitada;
      this.marcarReactivos();
      this.marcarCristaleria();
    });
  }

  private abrirDialogoConfirmacion() {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje: '¿Desea finalizar la revisión?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.modificar();
      }
    });
  }

  private abrirDialogoRechazo() {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje: '¿Desea rechazar la solicitud?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rechazar();
      }
    });
  }

  rechazar() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dataSourceReactivos.data.length; i++) {
        this.dataSourceReactivos.data[i].estadoEnSolicitud = 'Rechazado';
        this.dataSourceReactivos.data[i].justificacionRechazo = 'Solicitud Rechazada';
    }
    // Aqui se hace para cristaleria
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dataSourceCristaleria.data.length; i++) {
        this.dataSourceCristaleria.data[i].estadoEnSolicitud = 'Rechazado';
        this.dataSourceCristaleria.data[i].justificacionRechazo = 'Solicitud Rechazada';
    }
    this.solicitud.estado = 'Denegado';
    this.solicitud.fechaAprobacion = new Date();
    console.log(this.solicitud.fechaAprobacion);
    this.solicitudesRegenciaService.modificarSolicitud(this.solicitud).subscribe(
      res => {
        this.routeService.navigate(['/regencia/solicitudes', 'pendientes']);
      },
      error => {
        this.abrirDialogoError('Error al procesar solicitud, inténtelo de nuevo');
      });
  }

  modificar() {
    // Se rechazan y pone justificacion a reactivos rechazados
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dataSourceReactivos.data.length; i++) {
      if (!this.selectionReactivo.isSelected(this.dataSourceReactivos.data[i])) {
        this.dataSourceReactivos.data[i].estadoEnSolicitud = 'Rechazado';
      } else {
        this.dataSourceReactivos.data[i].estadoEnSolicitud = 'Aceptado';
        this.dataSourceReactivos.data[i].justificacionRechazo = '';
      }
    }
    // Aqui se hace para cristaleria
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dataSourceCristaleria.data.length; i++) {
      if (!this.selectionCristaleria.isSelected(this.dataSourceCristaleria.data[i])) {
        this.dataSourceCristaleria.data[i].estadoEnSolicitud = 'Rechazado';
      } else {
        this.dataSourceCristaleria.data[i].estadoEnSolicitud = 'Aceptado';
        this.dataSourceCristaleria.data[i].justificacionRechazo = '';
      }
    }
    this.solicitud.estado = 'Aceptado';
    this.solicitud.fechaAprobacion = new Date();
    console.log(this.solicitud.fechaAprobacion);
    this.solicitudesRegenciaService.modificarSolicitud(this.solicitud).subscribe(
      res => {
        this.routeService.navigate(['/regencia/solicitudes', 'pendientes']);
      },
      (err) => {
        console.log(err.status);
        if (err.status === 422) {
          this.abrirDialogoError('Error al procesar solicitud, inténtelo de nuevo');
        }
        if (err.status === 406) {
          this.abrirDialogoError('No hay cantidad disponible');
        }
      });
  }

  get nombreSolicitante() {
    return this.formSolicitud.get('nombreSolicitante');
  }

  get correoSolicitante() {
    return this.formSolicitud.get('correoSolicitante');
  }

  get nombreEncargado() {
    return this.formSolicitud.get('nombreEncargado');
  }

  get observacion() {
    return this.formSolicitud.get('observacion');
  }

  marcarReactivos() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dataSourceReactivos.data.length; i++) {
      this.selectionReactivo.select(this.dataSourceReactivos.data[i]);
    }
  }

  marcarCristaleria() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.dataSourceCristaleria.data.length; i++) {
      this.selectionCristaleria.select(this.dataSourceCristaleria.data[i]);
    }
  }

  isAllSelectedReactivo() {
    const numSelected = this.selectionReactivo.selected.length;
    const numRows = this.dataSourceReactivos.data.length;
    return numSelected === numRows;
  }

  deshabilitarBotonAceptar(): boolean {
    if ( (this.selectionReactivo.selected.length === 0 && this.selectionCristaleria.selected.length === 0) ) {
      return true;
    }
  }

  deshabilitarBotonRechazar(): boolean {
    if ( (this.selectionReactivo.selected.length > 0 && this.selectionCristaleria.selected.length > 0) ) {
      return true;
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabelReactivo(row?: ReactivoEntidad): string {
    if (!row) {
      return `${this.isAllSelectedReactivo() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectionReactivo.isSelected(row) ? 'deselect' : 'select'} }`;
  }

  isAllSelectedCristaleria() {
    const numSelected = this.selectionCristaleria.selected.length;
    const numRows = this.dataSourceCristaleria.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabelCristaleria(row?: CristaleriaEntidad): string {
    if (!row) {
      return `${this.isAllSelectedCristaleria() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectionCristaleria.isSelected(row) ? 'deselect' : 'select'} }`;
  }

  cancelar() {
    this.routeService.navigate(['/regencia/solicitudes', 'pendientes']);
  }

  bloquearJustificacionReact(row?: ReactivoEntidad) {
    if (this.selectionReactivo.isSelected(row)) {
      row.justificacionRechazo = '';
      return true;
    } else {
      return false;
    }
  }

  bloquearJustificacionCrist(row?: CristaleriaEntidad) {
    if (this.selectionCristaleria.isSelected(row)) {
      row.justificacionRechazo = '';
      return true;
    } else {
      return false;
    }
  }

  mostrarTextoReact(row?: ReactivoEntidad) {
    if (this.selectionReactivo.isSelected(row)) {
      return '';
    } else {
      return 'Indique la justificación del rechazo';
    }
  }
  mostrarTextoCrist(row?: CristaleriaEntidad) {
    if (this.selectionCristaleria.isSelected(row)) {
      return '';
    } else {
      return 'Indique la justificación del rechazo';
    }
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

  onKeyReactivo(event: any, reactivo: ReactivoEntidad) {
    reactivo.justificacionRechazo = event.target.value;
  }

  onKeyCristaleria(event: any, cristaleria: CristaleriaEntidad) {
    cristaleria.justificacionRechazo = event.target.value;
  }
}


