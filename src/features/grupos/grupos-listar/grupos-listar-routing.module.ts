import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';
import { GruposListarComponent } from './grupos-listar.component';

const routes: Routes = [
  {
    path: 'grupos',
    component: GruposListarComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GruposListarRoutingModule { }
