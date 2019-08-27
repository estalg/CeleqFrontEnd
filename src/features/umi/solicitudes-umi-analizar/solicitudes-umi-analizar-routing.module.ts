import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';
import {SolicitudesUmiAnalizarComponent} from './solicitudes-umi-analizar.component';

const routes: Routes = [
  {
    path: 'umi/analizar-solicitud/:id/:anno',
    component: SolicitudesUmiAnalizarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['31']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class SolicitudesUmiAnalizarRoutingModule { }
