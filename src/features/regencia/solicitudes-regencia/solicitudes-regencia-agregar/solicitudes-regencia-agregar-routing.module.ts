import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudesRegenciaAgregarComponent} from './solicitudes-regencia-agregar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'regencia/solicitudes/:modo/:id/:anno',
    component: SolicitudesRegenciaAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['25']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SolicitudesRegenciaAgregarRoutingModule { }
