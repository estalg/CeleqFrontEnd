import { Component, OnInit } from '@angular/core';
import {SolicitudUmiEntidad} from '../../../shared/entidades/umi/solicitudUmiEntidad';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UmiService} from '../../../shared/servicios/umi/umi.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-solicitudes-umi-finalizar',
  templateUrl: './solicitudes-umi-finalizar.component.html',
  styleUrls: ['./solicitudes-umi-finalizar.component.css']
})
export class SolicitudesUmiFinalizarComponent implements OnInit {

  private solicitud: SolicitudUmiEntidad;
  private formSolicitud: FormGroup;

  constructor(private solicitudUmiService: UmiService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.solicitud = new SolicitudUmiEntidad();

    this.formSolicitud = this.fb.group({
      periodo: [''],
      observaciones: ['']
    });
  }

  get periodo() {
    return this.formSolicitud.get('periodo');
  }
  get observaciones() {
    return this.formSolicitud.get('observaciones');
  }

  cancelar() {
    this.routeService.navigate(['/']);
  }

  finalizar() {
    const nuevaSolicitud = new SolicitudUmiEntidad();

    nuevaSolicitud.id = this.route.snapshot.params.id;
    nuevaSolicitud.anno = this.route.snapshot.params.anno;
    nuevaSolicitud.periodoEjecucion = this.formSolicitud.controls.periodo.value;
    nuevaSolicitud.observacionesFinales = this.formSolicitud.controls.observaciones.value;

    this.solicitudUmiService.finalizarSolicitud(nuevaSolicitud).subscribe(result => {
      this.routeService.navigate(['/']);
    }, error => {
      this.abrirDialogoError('Error al conectarse con la base de datos. Intente de nuevo más tarde.');
    });
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

}
