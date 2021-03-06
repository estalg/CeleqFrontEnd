import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule} from '@angular/material';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
