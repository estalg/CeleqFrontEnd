import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';

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
