import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DesignacionesListarComponent} from './designaciones-listar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'regimen-becario/designaciones',
    component: DesignacionesListarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['35']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DesignacionesListarRoutingModule { }
