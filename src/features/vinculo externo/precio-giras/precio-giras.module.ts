import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrecioGirasListarComponent} from './precio-giras-listar/precio-giras-listar.component';
import {PrecioGirasEditarComponent} from './precio-giras-editar/precio-giras-editar.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material';
import {RouterModule} from '@angular/router';
import {MatCardModule, MatDialogModule, MatSelectModule, MatTableModule} from '@angular/material';
import {PrecioGirasListarRoutingModule} from './precio-giras-listar/precioGiras-listar-routing.module';

@NgModule({
  declarations: [
    PrecioGirasListarComponent,
    PrecioGirasEditarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    PrecioGirasListarRoutingModule
  ],
  exports: [
    PrecioGirasListarComponent
  ],
  entryComponents: [
    PrecioGirasEditarComponent
  ]
})
export class PrecioGirasModule { }
