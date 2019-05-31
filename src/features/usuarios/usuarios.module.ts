import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosListarComponent } from './usuarios-listar/usuarios-listar.component';
import { UsuariosListarRoutingModule} from './usuarios-listar/usuarios-listar-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UsuariosListarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UsuariosListarRoutingModule
  ],
  exports: [
    UsuariosListarComponent
  ]
})
export class UsuariosModule { }
