import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filtrar-reporte',
  templateUrl: './filtrar-reporte.component.html',
  styleUrls: ['./filtrar-reporte.component.css']
})
export class FiltrarReporteComponent implements OnInit {

  private formFiltro: FormGroup;
  private ciclo: string;

  constructor(public dialogRef: MatDialogRef<FiltrarReporteComponent>) {

  }

  ngOnInit() {
  }

  generarReporte() {

  }

}
