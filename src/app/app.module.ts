import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UsuariosModule } from '../features/usuarios/usuarios.module';
import { DialogoConfirmacionModule } from '../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.module';
import { AppRoutingModule} from './app-routing.module';
import { CristaleriaModule } from '../features/regencia/cristaleria/cristaleria.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UsuariosModule,
    CristaleriaModule,
    DialogoConfirmacionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
