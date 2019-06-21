import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SolicitudesRegenciaListarComponent} from './solicitudes-regencia-listar.component';

const routes: Routes = [
  {
    path: 'regencia/solicitudes/:modo',
    component: SolicitudesRegenciaListarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SolicitudesRegenciaListarRoutingModule { }
