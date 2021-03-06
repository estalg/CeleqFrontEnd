import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material';

import { DialogoConfirmacionComponent } from './dialogo-confirmacion.component';

@NgModule({
  declarations: [
    DialogoConfirmacionComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents: [
    DialogoConfirmacionComponent
  ]
})
export class DialogoConfirmacionModule { }
