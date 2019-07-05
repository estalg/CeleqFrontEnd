import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudesRegenciaListarComponent} from './solicitudes-regencia-listar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'regencia/solicitudes/:modo',
    component: SolicitudesRegenciaListarComponent,
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
export class SolicitudesRegenciaListarRoutingModule { }
