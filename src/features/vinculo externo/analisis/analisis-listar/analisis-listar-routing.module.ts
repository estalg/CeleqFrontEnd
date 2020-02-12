import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnalisisListarComponent} from './analisis-listar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'vinculo-externo/analisis',
    component: AnalisisListarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['54']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AnalisisListarRoutingModule { }
