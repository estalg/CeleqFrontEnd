import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteAgregarComponent } from './cliente-agregar/cliente-agregar.component';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ClienteListarComponent} from './cliente-listar/cliente-listar.component';
import {ClienteListarRoutingModule} from './cliente-listar/cliente-listar-routing.module';
import {ClienteAgregarRoutingModule} from './cliente-agregar/cliente-agregar-routing.module';

@NgModule({
  declarations: [
    ClienteAgregarComponent,
    ClienteListarComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSelectModule,
    ClienteListarRoutingModule,
    ClienteAgregarRoutingModule
  ],
  exports: [
    ClienteAgregarComponent,
    ClienteListarComponent
  ]
})
export class ClienteModule { }
