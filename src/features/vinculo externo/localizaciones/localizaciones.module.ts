import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizacionesAgregarComponent } from './localizaciones-agregar/localizaciones-agregar.component';
import { LocalizacionesListarComponent } from './localizaciones-listar/localizaciones-listar.component';
import { LocalizacionesListarRoutingModule } from './localizaciones-listar/localizaciones-listar-routing.module';
import { LocalizacionesAgregarRoutingModule } from './localizaciones-agregar/localizaciones-agregar-routing.module';
import { MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatButtonModule,
  MatFormFieldModule, MatGridListModule, MatCardModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LocalizacionesListarComponent,
    LocalizacionesAgregarComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    LocalizacionesListarRoutingModule,
    LocalizacionesAgregarRoutingModule,
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
    RouterModule
  ],
  exports: [
    LocalizacionesListarComponent,
    LocalizacionesAgregarComponent
  ]
})
export class LocalizacionesModule { }
