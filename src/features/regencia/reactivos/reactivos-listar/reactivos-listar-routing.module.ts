import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactivosListarComponent} from './reactivos-listar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'regencia/reactivos',
    component: ReactivosListarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['15']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ReactivosListarRoutingModule { }
