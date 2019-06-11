import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosListarComponent } from './usuarios-listar/usuarios-listar.component';
import { UsuariosListarRoutingModule} from './usuarios-listar/usuarios-listar-routing.module';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatButtonModule,
         MatFormFieldModule, MatGridListModule, MatCardModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuariosAgregarComponent } from './usuarios-agregar/usuarios-agregar.component';
import { UsuariosAgregarRoutingModule } from './usuarios-agregar/usuarios-agregar-routing.module';


@NgModule({
  declarations: [
    UsuariosListarComponent,
    UsuariosAgregarComponent
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
    MatButtonModule,
    UsuariosAgregarRoutingModule,
    MatFormFieldModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule
  ],
  exports: [
    UsuariosListarComponent,
    UsuariosAgregarComponent
  ]
})
export class UsuariosModule { }
