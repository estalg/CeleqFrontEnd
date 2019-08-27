import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SolicitudUmiEntidad} from '../../../shared/entidades/umi/solicitudUmiEntidad';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UmiService} from '../../../shared/servicios/umi/umi.service';

@Component({
  selector: 'app-solicitudes-umi-analizar',
  templateUrl: './solicitudes-umi-analizar.component.html',
  styleUrls: ['./solicitudes-umi-analizar.component.css']
})
export class SolicitudesUmiAnalizarComponent implements OnInit {

  private formSolicitud: FormGroup;
  private solicitud: SolicitudUmiEntidad;

  constructor(private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private umiService: UmiService) { }

  ngOnInit() {
    this.formSolicitud = this.fb.group({
      consecutivo: [''],
      nombreSolicitante: [''],
      telefono: [''],
      contacto: [''],
      urgencia: [''],
      areaTrabajo: [''],
      lugarTrabajo: [''],
      descripcion: [''],
      observacionesAprobacion: [''],
      insumos: ['', [
        Validators.required,
        Validators.maxLength(500)
      ]],
      costo: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      observacionesAnalisis: ['', [
        Validators.maxLength(500)
      ]],
      archivo: ['']
    });

    this.umiService.consultarSolicitud(this.route.snapshot.params.id, this.route.snapshot.params.anno).then(res => {
      this.solicitud = res;
      this.formSolicitud.controls.consecutivo.setValue(this.solicitud.id + '-' + this.solicitud.anno);
      this.formSolicitud.controls.nombreSolicitante.setValue(this.solicitud.nombreSolicitante);
      this.formSolicitud.controls.telefono.setValue(this.solicitud.telefono);
      this.formSolicitud.controls.contacto.setValue(this.solicitud.contactoAdicional);
      this.formSolicitud.controls.urgencia.setValue(this.solicitud.urgencia);
      this.formSolicitud.controls.areaTrabajo.setValue(this.solicitud.areaTrabajo);
      this.formSolicitud.controls.lugarTrabajo.setValue(this.solicitud.lugarTrabajo);
      this.formSolicitud.controls.descripcion.setValue(this.solicitud.descripcionTrabajo);
      this.formSolicitud.controls.observacionesAprobacion.setValue(this.solicitud.observacionesAprob);
    });
  }

  get consecutivo() {
    return this.formSolicitud.get('consecutivo');
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
  get observacionesAprobacion() {
    return this.formSolicitud.get('observacionesAprobacion');
  }
  get insumos() {
    return this.formSolicitud.get('insumos');
  }
  get costo() {
    return this.formSolicitud.get('costo');
  }
  get observacionesAnalisis() {
    return this.formSolicitud.get('observacionesAnalisis');
  }
  get archivo() {
    return this.formSolicitud.get('archivo');
  }

  aceptar() {

  }

  cancelar() {

  }
}
