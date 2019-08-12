import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnidadesAgregarComponent} from './unidades-agregar.component';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'unidades/:modo/:nombre',
    component: UnidadesAgregarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['7', '8']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UnidadesAgregarRoutingModule { }
