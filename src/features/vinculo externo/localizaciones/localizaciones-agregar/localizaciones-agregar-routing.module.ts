import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizacionesAgregarComponent } from './localizaciones-agregar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'vinculo-externo/localizaciones/:modo/:provincia/:canton/:localidad',
    component: LocalizacionesAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      permisos: ['45', '46']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LocalizacionesAgregarRoutingModule { }
