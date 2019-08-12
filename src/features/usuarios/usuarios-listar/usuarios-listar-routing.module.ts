import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosListarComponent} from './usuarios-listar.component';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosListarComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: ['2']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UsuariosListarRoutingModule { }
