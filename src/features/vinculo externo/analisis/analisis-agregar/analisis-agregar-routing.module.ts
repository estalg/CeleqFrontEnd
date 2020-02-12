import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnalisisAgregarComponent} from './analisis-agregar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'vinculo-externo/analisis/:modo/:descripcion/:tipoMuestra',
    component: AnalisisAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['55']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AnalisisAgregarRoutingModule { }
