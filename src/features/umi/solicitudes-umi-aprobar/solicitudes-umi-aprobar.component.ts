import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SolicitudesRegenciaService} from '../../../shared/servicios/regencia/solicitudes-regencia/solicitudes-regencia.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-solicitudes-umi-aprobar',
  templateUrl: './solicitudes-umi-aprobar.component.html',
  styleUrls: ['./solicitudes-umi-aprobar.component.css']
})
export class SolicitudesUmiAprobarComponent implements OnInit {

  private formSolicitud: FormGroup;
  private estadoSolicitud: string;

  constructor(private solicitudesRegenciaService: SolicitudesRegenciaService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

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
      personaAsignada: [''],
      observaciones: [''],
      motivoRechazo: ['']
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
  get personaAsignada() {
    return this.formSolicitud.get('personaAsignada');
  }
  get observaciones() {
    return this.formSolicitud.get('observaciones');
  }
  get motivoRechazo() {
    return this.formSolicitud.get('motivoRechazo');
  }

}
