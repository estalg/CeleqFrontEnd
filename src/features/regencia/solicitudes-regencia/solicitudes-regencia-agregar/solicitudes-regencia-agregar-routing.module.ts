import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudesRegenciaAgregarComponent} from './solicitudes-regencia-agregar.component';

const routes: Routes = [
  {
    path: 'regencia/solicitudes/:modo/:id/:anno',
    component: SolicitudesRegenciaAgregarComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SolicitudesRegenciaAgregarRoutingModule { }
