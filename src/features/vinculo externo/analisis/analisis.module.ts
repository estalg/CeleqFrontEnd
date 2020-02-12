import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnalisisAgregarComponent} from './analisis-agregar/analisis-agregar.component';
import {AnalisisListarComponent} from './analisis-listar/analisis-listar.component';
import {AnalisisAgregarRoutingModule} from './analisis-agregar/analisis-agregar-routing.module';
import {AnalisisListarRoutingModule} from './analisis-listar/analisis-listar-routing.module';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
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
import { TipoMuestraAgregarComponent } from './tipo-muestra-agregar/tipo-muestra-agregar.component';

@NgModule({
  declarations: [
    AnalisisAgregarComponent,
    AnalisisListarComponent,
    TipoMuestraAgregarComponent
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
    AnalisisListarRoutingModule,
    AnalisisAgregarRoutingModule,
    MatSelectModule
  ],
  exports: [
    AnalisisAgregarComponent,
    AnalisisListarComponent
  ],
  entryComponents: [
    TipoMuestraAgregarComponent
  ]
})
export class AnalisisModule { }
