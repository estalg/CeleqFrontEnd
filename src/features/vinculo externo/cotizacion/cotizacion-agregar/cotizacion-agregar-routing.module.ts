import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CotizacionAgregarComponent} from './cotizacion-agregar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'vinculo-externo/cotizacion/:modo/:id/:anno',
    component: CotizacionAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['61', '62']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CotizacionAgregarRoutingModule { }
