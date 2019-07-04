import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatButtonModule,
  MatFormFieldModule, MatGridListModule, MatCardModule, MatDialogModule, MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {UnidadesAgregarComponent} from './unidades-agregar/unidades-agregar.component';
import {UnidadesListarComponent} from './unidades-listar/unidades-listar.component';
import {UnidadesAgregarRoutingModule} from './unidades-agregar/unidades-agregar-routing.module';
import {UnidadesListarRoutingModule} from './unidades-listar/unidades-listar-routing.module';

@NgModule({
  declarations: [
    UnidadesListarComponent,
    UnidadesAgregarComponent
  ],
  imports: [
    CommonModule,
    UnidadesListarRoutingModule,
    UnidadesAgregarRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [
    UnidadesListarComponent,
    UnidadesAgregarComponent
  ]
})
export class UnidadesModule { }
