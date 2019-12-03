import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReactivoEntidad} from '../../../../shared/entidades/regencia/reactivoEntidad';
import {ActivatedRoute, Router} from '@angular/router';
import {ReactivosService} from '../../../../shared/servicios/regencia/reactivos/reactivos.service';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-reactivos-agregar',
  templateUrl: './reactivos-agregar.component.html',
  styleUrls: ['./reactivos-agregar.component.css']
})
export class ReactivosAgregarComponent implements OnInit {

  formReactivo: FormGroup;

  // Nombre de la página
  titulo: string;

  // Reactivo a editar/visualizar
  reactivo: ReactivoEntidad;

  // Modo del form
  modoForm: string;

  constructor(private reactivoService: ReactivosService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.reactivo = new ReactivoEntidad();

    this.formReactivo = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9áéíóúÁÉÍÓÚ[ \-\-\(\)\.\%\+\:\,]*'),
        Validators.maxLength(255)
      ]],
      pureza: ['', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9áéíóúÁÉÍÓÚ[ \.\%]*'),
        Validators.maxLength(100)
      ]],
      cantidad: ['', [
        Validators.pattern('[0-9]*')
      ]],
      estado: ['', [
        Validators.required,
        Validators.pattern('[A-Za-záéíóúÁÉÍÓÚ[\.\/]*'),
        Validators.maxLength(10)
      ]],
      estante: ['', [
        Validators.required,
        Validators.pattern('[[A-Za-z]*[0-9]*]*'),
        Validators.maxLength(10)
      ]],
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar Reactivos';
    } else {

      this.reactivoService.consultarReactivo(this.route.snapshot.params.nombre, this.route.snapshot.params.pureza).then(res => {
        this.reactivo = res;
        this.formReactivo.controls.nombre.setValue(this.reactivo.nombre);
        this.formReactivo.controls.pureza.setValue(this.reactivo.pureza);
        this.formReactivo.controls.cantidad.setValue(this.reactivo.cantidad);
        this.formReactivo.controls.estado.setValue(this.reactivo.estado);
        this.formReactivo.controls.estante.setValue(this.reactivo.estante);
      });

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar Reactivos';
        this.formReactivo.controls.nombre.disable();
        this.formReactivo.controls.pureza.disable();
      } else {
        this.titulo = 'Visualizar Reactivos';
        this.formReactivo.disable();
      }
    }
  }

  get nombre() {
    return this.formReactivo.get('nombre');
  }
  get pureza() {
    return this.formReactivo.get('pureza');
  }
  get cantidad() {
    return this.formReactivo.get('cantidad');
  }
  get estado() {
    return this.formReactivo.get('estado');
  }
  get estante() {
    return this.formReactivo.get('estante');
  }

  cancelar() {
    this.routeService.navigate(['/regencia/reactivos']);
  }

  async agregar() {
    const reactivoNuevo = new ReactivoEntidad();
    reactivoNuevo.nombre = this.formReactivo.controls.nombre.value;
    reactivoNuevo.pureza = this.formReactivo.controls.pureza.value;
    reactivoNuevo.cantidad = this.formReactivo.controls.cantidad.value;
    reactivoNuevo.estado = this.formReactivo.controls.estado.value;
    reactivoNuevo.estante = this.formReactivo.controls.estante.value;

    this.reactivoService.agregar(reactivoNuevo).subscribe(
      result => {
      this.routeService.navigate(['/regencia/reactivos']);
      this.abrirDialogoAfirmacion('Reactivo agregado correctamente');
    },
      error => {
        this.abrirDialogoError('Error al agregar reactivo');
      });
  }

  async modificar() {
    const reactivoModificado = new ReactivoEntidad();
    reactivoModificado.nombre = this.formReactivo.controls.nombre.value;
    reactivoModificado.pureza = this.formReactivo.controls.pureza.value;
    reactivoModificado.cantidad = this.formReactivo.controls.cantidad.value;
    reactivoModificado.estado = this.formReactivo.controls.estado.value;
    reactivoModificado.estante = this.formReactivo.controls.estante.value;

    this.reactivoService.modificar(reactivoModificado).subscribe(
      result => {
      this.routeService.navigate(['/regencia/reactivos']);
      this.abrirDialogoAfirmacion('Reactivo modificado correctamente');
    },
      error => {
        this.abrirDialogoError('Error al modificar reactivo');
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
