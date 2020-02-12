import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CotizacionListarComponent} from './cotizacion-listar/cotizacion-listar.component';
import {CotizacionAgregarComponent} from './cotizacion-agregar/cotizacion-agregar.component';
import {CotizacionListarRoutingModule} from './cotizacion-listar/cotizacion-listar-routing.module';
import {CotizacionAgregarRoutingModule} from './cotizacion-agregar/cotizacion-agregar-routing.module';
import {SeleccionarAnalisisCotizacionComponent} from './seleccionar-analisis-cotizacion/seleccionar-analisis-cotizacion.component';

@NgModule({
  declarations: [
    CotizacionListarComponent,
    CotizacionAgregarComponent,
    SeleccionarAnalisisCotizacionComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSelectModule,
    CotizacionListarRoutingModule,
    CotizacionAgregarRoutingModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  exports: [
    CotizacionListarComponent,
    CotizacionAgregarComponent
  ],
  entryComponents: [
    SeleccionarAnalisisCotizacionComponent
  ]
})
export class CotizacionModule { }
