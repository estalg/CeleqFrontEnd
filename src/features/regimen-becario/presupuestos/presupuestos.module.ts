import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PresupuestoAgregarComponent} from './presupuesto-agregar/presupuesto-agregar.component';
import {PresupuestoConsultarComponent} from './presupuesto-consultar/presupuesto-consultar.component';
import {PresupuestoAgregarRoutingModule} from './presupuesto-agregar/presupuesto-agregar-routing.module';
import {PresupuestoConsultarRoutingModule} from './presupuesto-consultar/presupuesto-consultar-routing.module';
import {MatCardModule, MatInputModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    PresupuestoAgregarComponent,
    PresupuestoConsultarComponent
  ],
  imports: [
    CommonModule,
    PresupuestoAgregarRoutingModule,
    PresupuestoConsultarRoutingModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  exports: [
    PresupuestoAgregarComponent,
    PresupuestoConsultarComponent
  ]
})
export class PresupuestosModule { }
