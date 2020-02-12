import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClienteAgregarComponent} from './cliente-agregar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'vinculo-externo/clientes/:modo/:nombre',
    component: ClienteAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['58', '59']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClienteAgregarRoutingModule { }
