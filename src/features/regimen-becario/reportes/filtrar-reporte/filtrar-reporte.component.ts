import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filtrar-reporte',
  templateUrl: './filtrar-reporte.component.html',
  styleUrls: ['./filtrar-reporte.component.css']
})
export class FiltrarReporteComponent implements OnInit {

  private formFiltro: FormGroup;
  private ciclo: string;

  constructor(public dialogRef: MatDialogRef<FiltrarReporteComponent>,
              private fb: FormBuilder,
              private routeService: Router) {

  }

  ngOnInit() {
    this.formFiltro = this.fb.group({
      anno: ['', [
        Validators.required
      ]],
      filtro: ['', [
        Validators.required
      ]]
    });
    // @ts-ignore
    this.formFiltro.controls.anno.value = new Date().getFullYear();
  }

  generarReporte() {
    const anno = this.formFiltro.controls.anno.value;
    const tipo = this.formFiltro.controls.filtro.value;
    const ciclo = this.ciclo;

    if (tipo === 'estudiante') {
      // tslint:disable-next-line:max-line-length
      window.open('http://localhost:81/celeqBackEnd/api/regimen-becario/reportes/reporte-designaciones-estudiante?anno=' + anno + '&ciclo=' + ciclo, '_self');
    } else if (tipo === 'responsable') {
      // tslint:disable-next-line:max-line-length
      window.open('http://localhost:81/celeqBackEnd/api/regimen-becario/reportes/reporte-designaciones-responsable?anno=' + anno + '&ciclo=' + ciclo, '_self');
    } else if (tipo === 'presupuesto') {
      // tslint:disable-next-line:max-line-length
      window.open('http://localhost:81/celeqBackEnd/api/regimen-becario/reportes/reporte-designaciones-presupuesto?anno=' + anno + '&ciclo=' + ciclo, '_self');
    }
  }

}
