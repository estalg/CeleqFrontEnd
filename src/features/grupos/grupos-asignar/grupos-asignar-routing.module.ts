import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';
import {GruposAsignarComponent} from './grupos-asignar.component';

const routes: Routes = [
  {
    path: 'grupos/asignar',
    component: GruposAsignarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['14']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GruposAsignarRoutingModule { }
