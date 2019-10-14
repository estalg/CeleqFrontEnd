import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CambioContrasennaComponent} from './cambio-contrasenna.component';
import {CambioContrasennaRoutingModule} from './cambio-contrasenna.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';

@NgModule({
  declarations: [
    CambioContrasennaComponent
  ],
  imports: [
    CommonModule,
    CambioContrasennaRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule
  ]
})
export class CambioContrasennaModule { }
