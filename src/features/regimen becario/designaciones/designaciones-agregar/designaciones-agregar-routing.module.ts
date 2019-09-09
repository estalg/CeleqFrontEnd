import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';
import {DesignacionesAgregarComponent} from './designaciones-agregar.component';

const routes: Routes = [
  {
    path: 'regimen-becario/designaciones/:modo/:id/:anno',
    component: DesignacionesAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['34', '36']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DesignacionesAgregarRoutingModule { }
