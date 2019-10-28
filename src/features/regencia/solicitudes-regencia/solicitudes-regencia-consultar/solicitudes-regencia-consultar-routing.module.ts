import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudesRegenciaConsultarComponent} from './solicitudes-regencia-consultar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'regencia/solicitudes-consultar/:id/:anno',
    component: SolicitudesRegenciaConsultarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['27', '28']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class SolicitudesRegenciaConsultarRoutingModule { }
