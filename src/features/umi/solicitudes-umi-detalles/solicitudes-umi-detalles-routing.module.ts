import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudesUmiDetallesComponent} from './solicitudes-umi-detalles.component';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'umi/solicitud/:id/:anno',
    component: SolicitudesUmiDetallesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['33']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SolicitudesUmiDetallesRoutingModule { }
