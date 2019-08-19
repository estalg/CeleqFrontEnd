import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SolicitudesUmiAgregarComponent} from './solicitudes-umi-agregar/solicitudes-umi-agregar.component';
import {SolicitudesUmiAgregarRoutingModule} from './solicitudes-umi-agregar/solicitudes-umi-agregar-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    SolicitudesUmiAgregarComponent
  ],
  imports: [
    CommonModule,
    SolicitudesUmiAgregarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    SolicitudesUmiAgregarComponent
  ]
})
export class UmiModule { }
