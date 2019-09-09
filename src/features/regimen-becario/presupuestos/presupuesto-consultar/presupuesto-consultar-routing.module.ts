import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';
import {PresupuestoConsultarComponent} from './presupuesto-consultar.component';

const routes: Routes = [
  {
    path: 'regimen-becario/presupuestos',
    component: PresupuestoConsultarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['40', '41']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PresupuestoConsultarRoutingModule { }
