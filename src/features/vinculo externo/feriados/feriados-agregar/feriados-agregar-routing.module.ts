import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeriadosAgregarComponent} from './feriados-agregar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'vinculo-externo/feriados/:modo/:id',
    component: FeriadosAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['51', '52']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeriadosAgregarRoutingModule { }
