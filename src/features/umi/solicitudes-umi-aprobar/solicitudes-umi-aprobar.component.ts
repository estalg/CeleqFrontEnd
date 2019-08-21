import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SolicitudesRegenciaService} from '../../../shared/servicios/regencia/solicitudes-regencia/solicitudes-regencia.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-solicitudes-umi-aprobar',
  templateUrl: './solicitudes-umi-aprobar.component.html',
  styleUrls: ['./solicitudes-umi-aprobar.component.css']
})
export class SolicitudesUmiAprobarComponent implements OnInit {

  private shown: boolean;
  private formSolicitudMantenimiento: FormGroup;
  markedAceptar = false;
  markedRechazar = false;
  theCheckbox  = false;

  constructor(private solicitudesRegenciaService: SolicitudesRegenciaService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.formSolicitudMantenimiento = this.fb.group({
      check1: [''],
      rechazar: ['']
    });
  }

  AccionAceptar() {
    if (this.markedAceptar === true) {
      this.markedAceptar = false;
    } else {
      this.markedAceptar = true;
    }
  }

  AccionRechazar() {
    if (this.markedRechazar === true) {
      this.markedRechazar = false;
    } else {
      this.markedRechazar = true;
    }
  }

  habilitadoAceptar() {
    return this.markedAceptar;
  }

  habilitadoRechazar() {
    return this.markedRechazar;
  }

  toggleVisibility(e) {
    this.markedAceptar = e.target.checked;
  }
}
