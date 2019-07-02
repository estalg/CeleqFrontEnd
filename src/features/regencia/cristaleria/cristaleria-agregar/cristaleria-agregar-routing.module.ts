import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CristaleriaAgregarComponent } from './cristaleria-agregar.component';
import {AuthGuard} from '../../../../shared/Seguridad/auth.guard';

const routes: Routes = [
  {
    path: 'regencia/cristaleria/:modo/:nombre/:material/:capacidad',
    component: CristaleriaAgregarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CristaleriaAgregarRoutingModule { }
