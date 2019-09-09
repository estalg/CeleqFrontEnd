import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArancelesListarComponent} from './aranceles-listar/aranceles-listar.component';
import {ArancelesListarRoutingModule} from './aranceles-listar/aranceles-listar-routing.module';
import {RouterModule} from '@angular/router';
import {MatCardModule, MatDialogModule, MatSelectModule, MatTableModule} from '@angular/material';
import {ArancelesEditarComponent} from './aranceles-editar/aranceles-editar.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    ArancelesListarComponent,
    ArancelesEditarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ArancelesListarRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    ArancelesListarComponent
  ],
  entryComponents: [
    ArancelesEditarComponent
  ]
})
export class ArancelesModule { }
