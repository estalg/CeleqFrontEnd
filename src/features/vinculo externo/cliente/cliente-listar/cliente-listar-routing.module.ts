import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClienteListarComponent} from './cliente-listar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'vinculo-externo/clientes',
    component: ClienteListarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['57']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClienteListarRoutingModule { }
