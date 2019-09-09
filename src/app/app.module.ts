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
import { SolicitudesRegenciaModule } from '../features/regencia/solicitudes-regencia/solicitudes-regencia.module';
import {ReactivosModule} from '../features/regencia/reactivos/reactivos.module';
import { LocalizacionesModule } from '../features/vinculo externo/localizaciones/localizaciones.module';
import {LoginModule} from '../features/login/login.module';
import {GruposModule} from '../features/grupos/grupos.module';
import {UnidadesModule} from '../features/unidades/unidades.module';
import {BnNgIdleService} from 'bn-ng-idle';
import {UmiModule} from '../features/umi/umi.module';
import {DesignacionesModule} from '../features/regimen becario/designaciones/designaciones.module';

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
    ReactivosModule,
    LocalizacionesModule,
    DialogoConfirmacionModule,
    HeaderModule,
    MenuModule,
    SolicitudesRegenciaModule,
    LoginModule,
    GruposModule,
    UnidadesModule,
    UmiModule,
    DesignacionesModule
  ],
  providers: [
    BnNgIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
