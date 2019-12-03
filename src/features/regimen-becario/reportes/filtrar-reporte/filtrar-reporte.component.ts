import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-filtrar-reporte',
  templateUrl: './filtrar-reporte.component.html',
  styleUrls: ['./filtrar-reporte.component.css']
})
export class FiltrarReporteComponent implements OnInit {

  formFiltro: FormGroup;
  ciclo: string;

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
      window.open(environment.backendUrl + '/designacion/reporte?tipo=estudiante&anno=' + anno + '&ciclo=' + ciclo, '_blank');
    } else if (tipo === 'responsable') {
      // tslint:disable-next-line:max-line-length
      window.open(environment.backendUrl + '/designacion/reporte?tipo=responsable&anno=' + anno + '&ciclo=' + ciclo, '_blank');
    } else if (tipo === 'presupuesto') {
      // tslint:disable-next-line:max-line-length
      window.open(environment.backendUrl + '/designacion/reporte?tipo=presupuesto&anno=' + anno + '&ciclo=' + ciclo, '_blank');
    }
  }

}
