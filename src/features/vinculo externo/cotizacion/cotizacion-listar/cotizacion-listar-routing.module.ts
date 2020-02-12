import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CotizacionListarComponent} from './cotizacion-listar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'vinculo-externo/cotizacion',
    component: CotizacionListarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['60']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CotizacionListarRoutingModule { }
