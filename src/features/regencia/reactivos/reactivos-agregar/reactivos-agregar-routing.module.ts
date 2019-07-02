import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactivosAgregarComponent } from './reactivos-agregar.component';
import {AuthGuard} from '../../../../shared/Seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'regencia/reactivos/:modo/:nombre/:pureza',
    component: ReactivosAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ReactivosAgregarRoutingModule { }
