import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosAgregarComponent } from './usuarios-agregar.component';

const routes: Routes = [
  {
    path: 'usuarios/:modo/:cedula',
    component: UsuariosAgregarComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UsuariosAgregarRoutingModule { }
