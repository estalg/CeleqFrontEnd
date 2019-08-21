import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudesUmiAprobarComponent} from './solicitudes-umi-aprobar.component';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'umi/solicitudes-aprobar/:id/:anno',
    component: SolicitudesUmiAprobarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['26']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class SolicitudesUmiAprobarRoutingModule { }
