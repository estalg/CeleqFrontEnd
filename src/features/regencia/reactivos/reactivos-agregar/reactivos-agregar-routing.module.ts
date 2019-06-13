import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactivosAgregarComponent } from './reactivos-agregar.component';

const routes: Routes = [
  {
    path: 'regencia/reactivos/:modo/:nombre/:pureza',
    component: ReactivosAgregarComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ReactivosAgregarRoutingModule { }
