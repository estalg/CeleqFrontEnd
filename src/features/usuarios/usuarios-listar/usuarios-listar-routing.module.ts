import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosListarComponent} from './usuarios-listar.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosListarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UsuariosListarRoutingModule { }
