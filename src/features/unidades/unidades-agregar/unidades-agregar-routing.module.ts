import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnidadesAgregarComponent} from './unidades-agregar.component';

const routes: Routes = [
  {
    path: 'unidades/:modo/:nombre',
    component: UnidadesAgregarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UnidadesAgregarRoutingModule { }
