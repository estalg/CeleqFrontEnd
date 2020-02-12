import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';
import {PrecioGirasListarComponent} from './precio-giras-listar.component';

const routes: Routes = [
  {
    path: 'vinculo-externo/precioGiras',
    component: PrecioGirasListarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['48']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PrecioGirasListarRoutingModule { }
