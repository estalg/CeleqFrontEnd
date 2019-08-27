import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UmiService} from '../../../shared/servicios/umi/umi.service';
import {SolicitudUmiEntidad} from '../../../shared/entidades/umi/solicitudUmiEntidad';
import {AuthenticationService} from '../../../shared/servicios/seguridad/authentication.service';
import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-solicitudes-umi-agregar',
  templateUrl: './solicitudes-umi-agregar.component.html',
  styleUrls: ['./solicitudes-umi-agregar.component.css']
})
export class SolicitudesUmiAgregarComponent implements OnInit {

  private formSolicitud: FormGroup;

  constructor(private fb: FormBuilder,
              private _routeService: Router,
              private _route: ActivatedRoute,
              public dialog: MatDialog,
              private umiService: UmiService,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.formSolicitud = this.fb.group({
      nombreSolicitante: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.maxLength(11)
      ]],
      contacto: [''],
      urgencia: ['', [
        Validators.required
      ]],
      areaTrabajo: ['', [
        Validators.required
      ]],
      lugarTrabajo: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      descripcion: ['', [
        Validators.required,
        Validators.maxLength(500)
      ]]
    });
  }

  get nombreSolicitante() {
    return this.formSolicitud.get('nombreSolicitante');
  }
  get telefono() {
    return this.formSolicitud.get('telefono');
  }
  get contacto() {
    return this.formSolicitud.get('contacto');
  }
  get urgencia() {
    return this.formSolicitud.get('urgencia');
  }
  get areaTrabajo() {
    return this.formSolicitud.get('areaTrabajo');
  }
  get lugarTrabajo() {
    return this.formSolicitud.get('lugarTrabajo');
  }
  get descripcion() {
    return this.formSolicitud.get('descripcion');
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

  cancelar() {
    this._routeService.navigate(['/']);
  }

  agregar() {
    const nuevaSolicitud = new SolicitudUmiEntidad();
    nuevaSolicitud.anno = (new Date()).getFullYear();
    nuevaSolicitud.nombreSolicitante = this.formSolicitud.controls.nombreSolicitante.value;
    nuevaSolicitud.telefono = this.formSolicitud.controls.telefono.value;
    nuevaSolicitud.contactoAdicional = this.formSolicitud.controls.contacto.value;
    nuevaSolicitud.urgencia = this.formSolicitud.controls.urgencia.value;
    nuevaSolicitud.areaTrabajo = this.formSolicitud.controls.areaTrabajo.value;
    nuevaSolicitud.lugarTrabajo = this.formSolicitud.controls.lugarTrabajo.value;
    nuevaSolicitud.descripcionTrabajo = this.formSolicitud.controls.descripcion.value;
    nuevaSolicitud.estado = 'Pendiente';
    nuevaSolicitud.usuario = this.authService.getCedula();

    this.umiService.agregarSolicitud(nuevaSolicitud).subscribe(result => {
      this._routeService.navigate(['/']);
    }, error => {
      this.abrirDialogoError('Error al conectarse con la base de datos. Intente de nuevo más tarde.');
    });
  }
}
