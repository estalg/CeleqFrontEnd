import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog} from '@angular/material';
import {AnalisisEntidad} from '../../../../shared/entidades/vinculo externo/analisisEntidad';
import {AnalisisService} from '../../../../shared/servicios/vinculo externo/analisis/analisis.service';

@Component({
  selector: 'app-analisis-agregar',
  templateUrl: './analisis-agregar.component.html',
  styleUrls: ['./analisis-agregar.component.css']
})
export class AnalisisAgregarComponent implements OnInit {

  formAnalisis: FormGroup;

  // Nombre de la página
  titulo: string;

  // Usuario a editar/visualizar
  analisis: AnalisisEntidad;

  // Modo del form
  modoForm: string;

  listaTipoMuestras: AnalisisEntidad[];

  constructor(private analisisService: AnalisisService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarTipos();
    this.modoForm = this.route.snapshot.params.modo;
    this.analisis = new AnalisisEntidad();

    this.formAnalisis = this.fb.group({
      descripcion: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      tipoMuestra: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      metodo: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      precio: ['', [
        Validators.required,
        Validators.pattern('[1-9]*')
      ]],
      acreditacion: ['', [
        Validators.required,
        Validators.pattern('[1-9]')
      ]]
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar Análisis';
    } else {

      // tslint:disable-next-line:max-line-length
      this.analisisService.consultarAnalisis(this.route.snapshot.params.descripcion, this.route.snapshot.params.tipoMuestra).then(res => {
        this.analisis = res;
        this.formAnalisis.controls.descripcion.setValue(this.analisis.descripcion);
        this.formAnalisis.controls.tipoMuestra.setValue(this.analisis.tipoMuestra);
        this.formAnalisis.controls.metodo.setValue(this.analisis.metodo);
        this.formAnalisis.controls.precio.setValue(this.analisis.precio);
        this.formAnalisis.controls.acreditacion.setValue(this.analisis.acreditacion);
      });

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar Análisis';
        this.formAnalisis.controls.descripcion.disable();
        this.formAnalisis.controls.tipoMuestra.disable();
      } else {
        this.titulo = 'Visualizar Cristaleria';
        this.formAnalisis.disable();
      }
    }
  }

  get descripcion() {
    return this.formAnalisis.get('descripcion');
  }
  get tipoMuestra() {
    return this.formAnalisis.get('tipoMuestra');
  }
  get metodo() {
    return this.formAnalisis.get('metodo');
  }
  get precio() {
    return this.formAnalisis.get('precio');
  }
  get acreditacion() {
    return this.formAnalisis.get('acreditacion');
  }

  cancelar() {
    this.routeService.navigate(['/vinculo-externo/analisis']);
  }

  async agregar() {
    const analisisNuevo = new AnalisisEntidad();
    analisisNuevo.descripcion = this.formAnalisis.controls.descripcion.value;
    analisisNuevo.tipoMuestra = this.formAnalisis.controls.tipoMuestra.value;
    analisisNuevo.metodo = this.formAnalisis.controls.metodo.value;
    analisisNuevo.precio = this.formAnalisis.controls.precio.value;
    analisisNuevo.acreditacion = this.formAnalisis.controls.acreditacion.value;

    this.analisisService.agregar(analisisNuevo).subscribe(result => {
        this.routeService.navigate(['/vinculo-externo/analisis']);
      },
      error => {
        this.abrirDialogoError('Error al agregar análisis, inténtelo de nuevo');
      });
  }

  async modificar() {
    const analisisModificado = new AnalisisEntidad();
    analisisModificado.descripcion = this.formAnalisis.controls.descripcion.value;
    analisisModificado.tipoMuestra = this.formAnalisis.controls.tipoMuestra.value;
    analisisModificado.metodo = this.formAnalisis.controls.metodo.value;
    analisisModificado.precio = this.formAnalisis.controls.precio.value;
    analisisModificado.acreditacion = this.formAnalisis.controls.acreditacion.value;

    this.analisisService.modificar(analisisModificado).subscribe(result => {
        this.routeService.navigate(['/vinculo-externo/analisis']);
      },
      error => {
        this.abrirDialogoError('Error al modificar análisis, inténtelo de nuevo');
      });
  }

  private consultarTipos() {
    this.analisisService.consultar_tipoMuestra().subscribe(res => {
      this.listaTipoMuestras = res;
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
