import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UsuariosModule } from '../features/usuarios/usuarios.module';
import { DialogoConfirmacionModule } from '../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.module';
import { AppRoutingModule} from './app-routing.module';
import { CristaleriaModule } from '../features/regencia/cristaleria/cristaleria.module';
import { HeaderModule } from '../features/header/header.module';
import { MenuModule } from '../features/menu/menu.module';
import {ReactivosModule} from '../features/regencia/reactivos/reactivos.module';

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
    ReactivosModule,
    DialogoConfirmacionModule,
    HeaderModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
