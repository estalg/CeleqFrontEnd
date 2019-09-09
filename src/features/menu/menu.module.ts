import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { MatExpansionModule, MatTreeModule, MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import {FiltrarReporteComponent} from '../regimen-becario/reportes/filtrar-reporte/filtrar-reporte.component';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatExpansionModule,
    MatTreeModule,
    MatButtonModule,
    RouterModule
  ],
  exports: [
    MenuComponent
  ],
  entryComponents: [
    FiltrarReporteComponent
  ]
})
export class MenuModule { }
