import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosListarComponent } from './usuarios-listar/usuarios-listar.component';
import { UsuariosListarRoutingModule} from './usuarios-listar/usuarios-listar-routing.module';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    UsuariosListarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UsuariosListarRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [
    UsuariosListarComponent
  ]
})
export class UsuariosModule { }
