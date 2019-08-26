import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SolicitudesUmiAgregarComponent} from './solicitudes-umi-agregar/solicitudes-umi-agregar.component';
import {SolicitudesUmiAgregarRoutingModule} from './solicitudes-umi-agregar/solicitudes-umi-agregar-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule, MatRadioModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SolicitudesUmiAprobarComponent } from './solicitudes-umi-aprobar/solicitudes-umi-aprobar.component';
import {SolicitudesUmiAprobarRoutingModule} from './solicitudes-umi-aprobar/solicitudes-umi-aprobar-routing.module';
import {SolicitudesUmiListarComponent} from './solicitudes-umi-listar/solicitudes-umi-listar.component';
import {SolicitudesUmiListarRoutingModule} from './solicitudes-umi-listar/solicitudes-umi-listar-routing.module';
import {SolicitudesUmiFinalizarComponent} from './solicitudes-umi-finalizar/solicitudes-umi-finalizar.component';
import {SolicitudesUmiFinalizarRoutingModule} from './solicitudes-umi-finalizar/solicitudes-umi-finalizar-routing.module';

@NgModule({
  declarations: [
    SolicitudesUmiAgregarComponent,
    SolicitudesUmiAprobarComponent,
    SolicitudesUmiListarComponent,
    SolicitudesUmiFinalizarComponent
  ],
  imports: [
    CommonModule,
    SolicitudesUmiAgregarRoutingModule,
    SolicitudesUmiListarRoutingModule,
    SolicitudesUmiFinalizarRoutingModule,
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
    MatSelectModule,
    MatCheckboxModule,
    SolicitudesUmiAprobarRoutingModule,
    MatRadioModule
  ],
  exports: [
    SolicitudesUmiAgregarComponent,
    SolicitudesUmiAprobarComponent,
    SolicitudesUmiListarComponent,
    SolicitudesUmiFinalizarComponent
  ]
})
export class UmiModule { }
