import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosAgregarComponent } from './usuarios-agregar.component';
import {AuthGuard} from '../../../shared/Seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'usuarios/:modo/:cedula',
    component: UsuariosAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UsuariosAgregarRoutingModule { }
