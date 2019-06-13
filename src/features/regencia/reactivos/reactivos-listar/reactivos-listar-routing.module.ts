import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactivosListarComponent} from './reactivos-listar.component';

const routes: Routes = [
  {
    path: 'regencia/reactivos',
    component: ReactivosListarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ReactivosListarRoutingModule { }
