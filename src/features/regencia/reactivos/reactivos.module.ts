import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactivosAgregarComponent} from './reactivos-agregar/reactivos-agregar.component';
import { ReactivosListarComponent} from './reactivos-listar/reactivos-listar.component';
import { ReactivosAgregarRoutingModule} from './reactivos-agregar/reactivos-agregar-routing.module';
import { ReactivosListarRoutingModule} from './reactivos-listar/reactivos-listar-routing.module';
import { MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatButtonModule,
  MatFormFieldModule, MatGridListModule, MatCardModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { SolicitudesRegenciaReactivos } from '../solicitudes-regencia/solicitudes-regencia-agregar/solicitudes-regencia-agregar.component';

@NgModule({
  declarations: [
    ReactivosListarComponent,
    ReactivosAgregarComponent
  ],
  imports: [
    CommonModule,
    ReactivosAgregarRoutingModule,
    ReactivosListarRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactivosAgregarComponent,
    ReactivosListarComponent
  ]
})
export class ReactivosModule {}
