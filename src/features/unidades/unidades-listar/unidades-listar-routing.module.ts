import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnidadesListarComponent} from './unidades-listar.component';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';


const routes: Routes = [
  {
    path: 'unidades',
    component: UnidadesListarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['6']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UnidadesListarRoutingModule { }
