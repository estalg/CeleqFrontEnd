import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CristaleriaListarComponent } from './cristaleria-listar.component';
import {AuthGuard} from '../../../../shared/seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'regencia/cristaleria',
    component: CristaleriaListarComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CristaleriaListarRoutingModule { }
