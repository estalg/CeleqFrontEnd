import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudesRegenciaListarComponent} from './solicitudes-regencia-listar.component';

const routes: Routes = [
  {
    path: 'regencia/solicitudes',
    component: SolicitudesRegenciaListarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SolicitudesRegenciaListarRoutingModule { }
