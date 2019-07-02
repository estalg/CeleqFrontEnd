import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactivosListarComponent} from './reactivos-listar.component';
import {AuthGuard} from '../../../../shared/Seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'regencia/reactivos',
    component: ReactivosListarComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ReactivosListarRoutingModule { }
