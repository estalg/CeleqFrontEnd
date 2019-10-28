import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {DesignacionesModule} from '../features/regimen-becario/designaciones/designaciones.module';
import {ArancelesModule} from '../features/regimen-becario/aranceles/aranceles.module';
import {PresupuestosModule} from '../features/regimen-becario/presupuestos/presupuestos.module';
import {ReportesModule} from '../features/regimen-becario/reportes/reportes.module';
import {TokenInterceptor} from '../shared/seguridad/token-interceptor';
import {CambioContrasennaModule} from '../features/cambio-contrasenna/cambio-contrasenna.module';

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
    DesignacionesModule,
    UmiModule,
    ArancelesModule,
    PresupuestosModule,
    ReportesModule,
    CambioContrasennaModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    BnNgIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
