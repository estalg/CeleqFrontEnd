import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizacionesAgregarComponent } from './localizaciones-agregar.component';

const routes: Routes = [
  {
    path: 'vinculoexterno/localizaciones',
    component: LocalizacionesAgregarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LocalizacionesAgregarRoutingModule { }
