import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CristaleriaAgregarComponent } from './cristaleria-agregar.component';

const routes: Routes = [
  {
    path: 'regencia/cristaleria/:modo/:nombre/:material/:capacidad',
    component: CristaleriaAgregarComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CristaleriaAgregarRoutingModule { }
