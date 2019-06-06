import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosListarComponent } from './usuarios-listar/usuarios-listar.component';
import { UsuariosListarRoutingModule} from './usuarios-listar/usuarios-listar-routing.module';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MatTableModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    UsuariosListarComponent
  ]
})
export class UsuariosModule { }
