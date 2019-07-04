import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';
import {GruposAgregarComponent} from './grupos-agregar.component';

const routes: Routes = [
  {
    path: 'grupos/:modo/:descripcion',
    component: GruposAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GruposAgregarRoutingModule { }
