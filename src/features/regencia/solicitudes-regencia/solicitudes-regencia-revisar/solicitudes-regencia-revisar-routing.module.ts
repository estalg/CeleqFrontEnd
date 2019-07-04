import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudesRegenciaRevisarComponent} from './solicitudes-regencia-revisar.component';

const routes: Routes = [
  {
    path: 'regencia/solicitudes-revisar/:id/:anno',
    component: SolicitudesRegenciaRevisarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class SolicitudesRegenciaRevisarRoutingModule { }
