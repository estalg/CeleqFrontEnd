import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArancelesListarComponent} from './aranceles-listar/aranceles-listar.component';
import {MatFormFieldModule} from '@angular/material/typings/esm5/form-field';
import {MatTableModule} from '@angular/material/typings/table';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ArancelesListarComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  exports: [
    ArancelesListarComponent
  ]
})
export class ArancelesModule { }
