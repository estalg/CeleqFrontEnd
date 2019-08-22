import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';
import {SolicitudesUmiListarComponent} from './solicitudes-umi-listar.component';

const routes: Routes = [
  {
    path: 'umi/solicitudes/:modo',
    component: SolicitudesUmiListarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['30', '31', '32', '33'] // Ver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SolicitudesUmiListarRoutingModule { }
