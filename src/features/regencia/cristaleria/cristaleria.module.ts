import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CristaleriaListarComponent } from './cristaleria-listar/cristaleria-listar.component';
import { CristaleriaAgregarComponent } from './cristaleria-agregar/cristaleria-agregar.component';
import { CristaleriaListarRoutingModule} from './cristaleria-listar/cristaleria-listar-routing.module';
import { CristaleriaAgregarRoutingModule} from './cristaleria-agregar/cristaleria-agregar-routing.module';

import { MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatButtonModule,
  MatFormFieldModule, MatGridListModule, MatCardModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {CristaleriaReporteComponent} from './cristaleria-reporte/cristaleria-reporte.component';

@NgModule({
  declarations: [
    CristaleriaListarComponent,
    CristaleriaAgregarComponent,
    CristaleriaReporteComponent
  ],
  imports: [
    CommonModule,
    CristaleriaListarRoutingModule,
    CristaleriaAgregarRoutingModule,
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
    RouterModule
  ],
  exports: [
    CristaleriaListarComponent,
    CristaleriaAgregarComponent,
    CristaleriaReporteComponent
  ]
})
export class CristaleriaModule { }
