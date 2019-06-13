import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CristaleriaListarComponent } from './cristaleria-listar.component';

const routes: Routes = [
  {
    path: 'regencia/cristaleria',
    component: CristaleriaListarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CristaleriaListarRoutingModule { }
