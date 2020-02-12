import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeriadosListarComponent} from './feriados-listar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'vinculo-externo/feriados',
    component: FeriadosListarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['50']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeriadosListarRoutingModule { }
