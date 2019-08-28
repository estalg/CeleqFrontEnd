import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudesUmiFinalizarComponent} from './solicitudes-umi-finalizar.component';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'umi/finalizar-solicitud/:id/:anno',
    component: SolicitudesUmiFinalizarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['32']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SolicitudesUmiFinalizarRoutingModule { }
