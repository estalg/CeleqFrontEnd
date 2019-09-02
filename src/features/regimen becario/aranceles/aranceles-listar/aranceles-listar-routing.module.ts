import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArancelesListarComponent} from './aranceles-listar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'regencia/reactivos',
    component: ArancelesListarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['41,42']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ArancelesListarRoutingModule { }
