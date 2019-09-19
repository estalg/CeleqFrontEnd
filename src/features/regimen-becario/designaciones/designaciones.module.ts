import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DesignacionesAgregarComponent} from './designaciones-agregar/designaciones-agregar.component';
import {DesignacionesAgregarRoutingModule} from './designaciones-agregar/designaciones-agregar-routing.module';
import {DesignacionesListarComponent} from './designaciones-listar/designaciones-listar.component';
import {DesignacionesListarRoutingModule} from './designaciones-listar/designaciones-listar-routing.module';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
  MatFormFieldModule, MatGridListModule,
  MatInputModule, MatNativeDateModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DesignacionesAgregarComponent,
    DesignacionesListarComponent
  ],
  imports: [
    CommonModule,
    DesignacionesAgregarRoutingModule,
    DesignacionesListarRoutingModule,
    RouterModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    DesignacionesAgregarComponent,
    DesignacionesListarComponent
  ]
})
export class DesignacionesModule { }
