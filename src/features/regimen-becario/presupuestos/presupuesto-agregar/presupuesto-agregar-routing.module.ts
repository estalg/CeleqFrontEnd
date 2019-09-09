import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';
import {PresupuestoAgregarComponent} from './presupuesto-agregar.component';

const routes: Routes = [
  {
    path: 'regimen-becario/presupuestos/:modo',
    component: PresupuestoAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['38', '39']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PresupuestoAgregarRoutingModule { }
