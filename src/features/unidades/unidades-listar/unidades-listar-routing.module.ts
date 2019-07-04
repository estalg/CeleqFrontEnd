import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnidadesListarComponent} from './unidades-listar.component';


const routes: Routes = [
  {
    path: 'unidades',
    component: UnidadesListarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UnidadesListarRoutingModule { }
