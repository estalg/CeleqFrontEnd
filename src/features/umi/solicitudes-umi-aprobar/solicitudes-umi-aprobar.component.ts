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

  constructor(private solicitudesRegenciaService: SolicitudesRegenciaService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.formSolicitud = this.fb.group({
      nombreSolicitante: ['', [
        Validators.required
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]],
      contacto: [''],
      urgencia: ['', [
        Validators.required
      ]],
      areaTrabajo: ['', [
        Validators.required
      ]],
      lugarTrabajo: ['', [
        Validators.required
      ]],
      descripcion: ['', [
        Validators.required
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

}
