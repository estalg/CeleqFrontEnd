import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {FeriadosListarComponent} from './feriados-listar/feriados-listar.component';
import {FeriadosAgregarComponent} from './feriados-agregar/feriados-agregar.component';
import {FeriadosListarRoutingModule} from './feriados-listar/feriados-listar-routing.module';
import {FeriadosAgregarRoutingModule} from './feriados-agregar/feriados-agregar-routing.module';


@NgModule({
  declarations: [
    FeriadosListarComponent,
    FeriadosAgregarComponent
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
    FeriadosListarRoutingModule,
    FeriadosAgregarRoutingModule,
    MatDatepickerModule
  ],
  exports: [
    FeriadosListarComponent,
    FeriadosAgregarComponent
  ]
})
export class FeriadosModule { }
