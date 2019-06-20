import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizacionesListarComponent } from './localizaciones-listar.component';

const routes: Routes = [
  {
    path: 'vinculoexterno/localizaciones',
    component: LocalizacionesListarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LocalizacionesListarRoutingModule { }
