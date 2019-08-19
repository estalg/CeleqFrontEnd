import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SolicitudesUmiAgregarComponent} from './solicitudes-umi-agregar/solicitudes-umi-agregar.component';
import {SolicitudesUmiAgregarRoutingModule} from './solicitudes-umi-agregar/solicitudes-umi-agregar-routing.module';

@NgModule({
  declarations: [
    SolicitudesUmiAgregarComponent
  ],
  imports: [
    CommonModule,
    SolicitudesUmiAgregarRoutingModule
  ],
  exports: [
    SolicitudesUmiAgregarComponent
  ]
})
export class UmiModule { }
