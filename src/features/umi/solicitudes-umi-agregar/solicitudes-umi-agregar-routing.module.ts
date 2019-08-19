import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';
import {SolicitudesUmiAgregarComponent} from './solicitudes-umi-agregar.component';

const routes: Routes = [
  {
    path: 'umi/nueva-solicitud',
    component: SolicitudesUmiAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['29']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SolicitudesUmiAgregarRoutingModule { }
