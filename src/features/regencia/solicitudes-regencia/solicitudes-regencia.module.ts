import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesRegenciaListarComponent } from './solicitudes-regencia-listar/solicitudes-regencia-listar.component';
import { SolicitudesRegenciaAgregarComponent } from './solicitudes-regencia-agregar/solicitudes-regencia-agregar.component';
import { SolicitudesRegenciaListarRoutingModule } from './solicitudes-regencia-listar/solicitudes-regencia-listar-routing.module';
import { SolicitudesRegenciaAgregarRoutingModule } from './solicitudes-regencia-agregar/solicitudes-regencia-agregar-routing.module';
import {RouterModule} from '@angular/router';
import {  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatPaginatorModule,
  MatSortModule, MatTableModule, MatCheckboxModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsuariosAgregarRoutingModule} from '../../usuarios/usuarios-agregar/usuarios-agregar-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SolicitudesRegenciaReactivos} from './solicitudes-regencia-agregar/solicitudes-regencia-agregar.component';
import {SolicitudesRegenciaCristaleria} from './solicitudes-regencia-agregar/solicitudes-regencia-agregar.component';

@NgModule({
  declarations: [
    SolicitudesRegenciaListarComponent,
    SolicitudesRegenciaAgregarComponent,
    SolicitudesRegenciaReactivos,
    SolicitudesRegenciaCristaleria
  ],
  imports: [
    CommonModule,
    RouterModule,
    SolicitudesRegenciaListarRoutingModule,
    SolicitudesRegenciaAgregarRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    UsuariosAgregarRoutingModule,
    MatFormFieldModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  exports: [
    SolicitudesRegenciaListarComponent,
    SolicitudesRegenciaAgregarComponent
  ],
  entryComponents: [
    SolicitudesRegenciaReactivos,
    SolicitudesRegenciaCristaleria
  ]
})
export class SolicitudesRegenciaModule { }
