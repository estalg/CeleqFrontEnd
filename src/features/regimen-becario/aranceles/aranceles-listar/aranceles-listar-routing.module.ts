import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';
import {ArancelesListarComponent} from './aranceles-listar.component';

const routes: Routes = [
  {
    path: 'regimen-becario/aranceles',
    component: ArancelesListarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['41', '42']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ArancelesListarRoutingModule { }
