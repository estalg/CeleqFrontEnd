import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GruposListarComponent} from './grupos-listar/grupos-listar.component';
import {GruposAgregarComponent} from './grupos-agregar/grupos-agregar.component';
import {GruposListarRoutingModule} from './grupos-listar/grupos-listar-routing.module';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GruposAgregarRoutingModule } from './grupos-agregar/grupos-agregar-routing.module';
import {GruposAsignarComponent} from './grupos-asignar/grupos-asignar.component';
import {GruposAsignarRoutingModule} from './grupos-asignar/grupos-asignar-routing.module';

@NgModule({
  declarations: [
    GruposListarComponent,
    GruposAgregarComponent,
    GruposAsignarComponent
  ],
  imports: [
    CommonModule,
    GruposListarRoutingModule,
    RouterModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    GruposAgregarRoutingModule,
    MatCheckboxModule,
    GruposAsignarRoutingModule,
    MatSelectModule
  ],
  exports: [
    GruposListarComponent,
    GruposAgregarComponent
  ]
})
export class GruposModule { }
