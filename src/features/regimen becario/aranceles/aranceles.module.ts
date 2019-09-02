import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArancelesListarComponent} from './aranceles-listar/aranceles-listar.component';

@NgModule({
  declarations: [
    ArancelesListarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArancelesListarComponent
  ]
})
export class ArancelesModule { }
