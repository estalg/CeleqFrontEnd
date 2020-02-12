import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog} from '@angular/material';
import {LocalizacionEntidad} from '../../../../shared/entidades/vinculo externo/localizacionEntidad';
import {LocalizacionesService} from '../../../../shared/servicios/vinculo externo/localizaciones/localizaciones.service';

@Component({
  selector: 'app-localizaciones-agregar',
  templateUrl: './localizaciones-agregar.component.html',
  styleUrls: ['./localizaciones-agregar.component.css']
})
export class LocalizacionesAgregarComponent implements OnInit {

  formLocalizaciones: FormGroup;

  // Nombre de la página
  titulo: string;

  // localizacion a editar/visualizar
  localizacion: LocalizacionEntidad;

  // Modo del form
  modoForm: string;

  constructor(private localizacionService: LocalizacionesService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.localizacion = new LocalizacionEntidad();

    this.formLocalizaciones = this.fb.group({
      provincia: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      canton: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      localidad: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      distancia: ['', [
        Validators.required
      ]],
      hospedaje: ['', [
        Validators.required
      ]]
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar Localización';
    } else {

      // tslint:disable-next-line:max-line-length
      this.localizacionService.consultarLocalizacion(this.route.snapshot.params.provincia, this.route.snapshot.params.canton, this.route.snapshot.params.localidad).then(res => {
        this.localizacion = res;
        this.formLocalizaciones.controls.provincia.setValue(this.localizacion.provincia);
        this.formLocalizaciones.controls.canton.setValue(this.localizacion.canton);
        this.formLocalizaciones.controls.localidad.setValue(this.localizacion.localidad);
        this.formLocalizaciones.controls.distancia.setValue(this.localizacion.distancia);
        this.formLocalizaciones.controls.hospedaje.setValue(this.localizacion.hospedaje);
      });

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar Localización';
        this.formLocalizaciones.controls.provincia.disable();
        this.formLocalizaciones.controls.canton.disable();
        this.formLocalizaciones.controls.localidad.disable();
      } else {
        this.titulo = 'Visualizar Localización';
        this.formLocalizaciones.disable();
      }
    }
  }

  get provincia() {
    return this.formLocalizaciones.get('provincia');
  }
  get canton() {
    return this.formLocalizaciones.get('canton');
  }
  get localidad() {
    return this.formLocalizaciones.get('localidad');
  }
  get distancia() {
    return this.formLocalizaciones.get('distancia');
  }
  get hospedaje() {
    return this.formLocalizaciones.get('hospedaje');
  }

  cancelar() {
    this.routeService.navigate(['/vinculo-externo/localizaciones']);
  }

  async agregar() {
    const localizacionNueva = new LocalizacionEntidad();
    localizacionNueva.provincia = this.formLocalizaciones.controls.provincia.value;
    localizacionNueva.canton = this.formLocalizaciones.controls.canton.value;
    localizacionNueva.localidad = this.formLocalizaciones.controls.localidad.value;
    localizacionNueva.distancia = this.formLocalizaciones.controls.distancia.value;
    localizacionNueva.hospedaje = this.formLocalizaciones.controls.hospedaje.value;

    this.localizacionService.agregar(localizacionNueva).subscribe(result => {
        this.routeService.navigate(['/vinculo-externo/localizaciones']);
      },
      error => {
        this.abrirDialogoError('Error al agregar localización, inténtelo de nuevo');
      });
  }

  async modificar() {
    const localizacionModificada = new LocalizacionEntidad();
    localizacionModificada.provincia = this.formLocalizaciones.controls.provincia.value;
    localizacionModificada.canton = this.formLocalizaciones.controls.canton.value;
    localizacionModificada.localidad = this.formLocalizaciones.controls.localidad.value;
    localizacionModificada.distancia = this.formLocalizaciones.controls.distancia.value;
    localizacionModificada.hospedaje = this.formLocalizaciones.controls.hospedaje.value;

    this.localizacionService.modificar(localizacionModificada).subscribe(result => {
        this.routeService.navigate(['/vinculo-externo/localizaciones']);
      },
      error => {
        this.abrirDialogoError('Error al modificar localización, inténtelo de nuevo');
      });
  }

  private abrirDialogoAfirmacion(mensaje: string) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'afirmacion'}
      });
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

}
