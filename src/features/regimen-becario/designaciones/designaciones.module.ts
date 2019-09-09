import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DesignacionesAgregarComponent} from './designaciones-agregar/designaciones-agregar.component';
import {DesignacionesAgregarRoutingModule} from './designaciones-agregar/designaciones-agregar-routing.module';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialogModule,
  MatFormFieldModule, MatGridListModule,
  MatInputModule,
  MatPaginatorModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DesignacionesAgregarComponent
  ],
  imports: [
    CommonModule,
    DesignacionesAgregarRoutingModule,
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
    MatGridListModule
  ],
  exports: [
    DesignacionesAgregarComponent
  ]
})
export class DesignacionesModule { }
