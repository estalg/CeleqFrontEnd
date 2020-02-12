import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizacionesListarComponent } from './localizaciones-listar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'vinculo-externo/localizaciones',
    component: LocalizacionesListarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['44']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LocalizacionesListarRoutingModule { }
