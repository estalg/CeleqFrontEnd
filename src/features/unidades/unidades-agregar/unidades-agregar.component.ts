import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {UnidadEntidad} from '../../../shared/entidades/unidad/unidadEntidad';
import {UnidadesService} from '../../../shared/servicios/unidades/unidades.service';
import {UsuariosService} from '../../../shared/servicios/usuarios/usuarios.service';
import {UsuarioEntidad} from '../../../shared/entidades/usuarioEntidad';

@Component({
  selector: 'app-unidades-agregar',
  templateUrl: './unidades-agregar.component.html',
  styleUrls: ['./unidades-agregar.component.css']
})
export class UnidadesAgregarComponent implements OnInit {

  private formUnidad: FormGroup;

  private selected: string;

  // Nombre de la página
  private titulo: string;

  // Reactivo a editar/visualizar
  private unidad: UnidadEntidad;

  private usuarios: UsuarioEntidad[];

  // Modo del form
  private modoForm: string;

  private nombreViejo: string;

  constructor(private unidadService: UnidadesService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private usuarioService: UsuariosService) { }

  async ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.unidad = new UnidadEntidad();

    this.usuarioService.consultar().subscribe(
      usuarios => {
        this.usuarios = usuarios as UsuarioEntidad[];
      });

    this.formUnidad = this.fb.group({
      nombre: ['', [
        Validators.required
      ]],
      encargado: ['', [
        Validators.required
      ]]
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar Unidades';
    } else {
      this.titulo = 'Editar Unidades';
      await this.unidadService.consultarUnidad(this.route.snapshot.params.nombre).then(res => {
        this.unidad = res;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.usuarios.length; i++) {
          if (this.usuarios[i].cedula === this.unidad.cedulaEncargado) {
            this.selected = this.usuarios[i].cedula;
          }
        }
        this.formUnidad = this.fb.group({
          nombre: ['', [
            Validators.required
          ]],
          encargado: [this.usuarios[this.selected], [
            Validators.required
          ]]
        });

        this.formUnidad.controls.nombre.setValue(this.unidad.nombre);
      });
    }

  }

  get nombre() {
    return this.formUnidad.get('nombre');
  }
  get encargado() {
    return this.formUnidad.get('encargado');
  }

  private cancelar() {
    this.routeService.navigate(['unidades']);
  }

  async agregar() {
    const unidadNueva = new UnidadEntidad();
    unidadNueva.nombre = this.formUnidad.controls.nombre.value;
    unidadNueva.encargado = this.formUnidad.controls.encargado.value;

    this.unidadService.agregar(unidadNueva).subscribe(
      result => {
        this.routeService.navigate(['unidades']);
        this.abrirDialogoAfirmacion('Unidad agregada correctamente');
      },
      error => {
        this.abrirDialogoError('Error al agregar unidad');
      });
  }

  async modificar() {
    const unidadModificada = new UnidadEntidad();
    unidadModificada.nombreViejo = this.route.snapshot.params.nombre;
    unidadModificada.nombreNuevo = this.formUnidad.controls.nombre.value;
    unidadModificada.encargado = this.formUnidad.controls.encargado.value;

    this.unidadService.modificar(unidadModificada).subscribe(
      result => {
        this.routeService.navigate(['unidades']);
        this.abrirDialogoAfirmacion('Unidad modificada correctamente');
      },
      error => {
        this.abrirDialogoError('Error al modificar unidad');
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
