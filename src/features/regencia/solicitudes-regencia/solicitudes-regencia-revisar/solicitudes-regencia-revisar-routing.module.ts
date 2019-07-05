import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudesRegenciaRevisarComponent} from './solicitudes-regencia-revisar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'regencia/solicitudes-revisar/:id/:anno',
    component: SolicitudesRegenciaRevisarComponent,
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

export class SolicitudesRegenciaRevisarRoutingModule { }
