import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FiltrarReporteComponent} from './filtrar-reporte/filtrar-reporte.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule, MatInputModule, MatRadioModule, MatSelectModule} from '@angular/material';
import {ReporteDesignacionesComponent} from './reporte-designaciones/reporte-designaciones.component';

@NgModule({
  declarations: [
    FiltrarReporteComponent,
    ReporteDesignacionesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    FiltrarReporteComponent,
    ReporteDesignacionesComponent
  ]
})
export class ReportesModule { }
