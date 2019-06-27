import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioEntidad} from '../../../shared/entidades/usuarioEntidad';
import {UsuariosService} from '../../../shared/servicios/usuarios/usuarios.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-usuarios-agregar',
  templateUrl: './usuarios-agregar.component.html',
  styleUrls: ['./usuarios-agregar.component.css']
})
export class UsuariosAgregarComponent implements OnInit {

  private formUsuario: FormGroup;

  // Nombre de la página
  private titulo: string;

  // Usuario a editar/visualizar
  private usuario: UsuarioEntidad;

  // Modo del form
  private modoForm: string;

  constructor(private usuarioService: UsuariosService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.usuario = new UsuarioEntidad();

    this.formUsuario = this.fb.group({
      cedula: ['', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('[0-9]*')
      ]],
      correo: ['', [
        Validators.required,
        Validators.email
      ]],
      telefono: ['', [
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('[0-9]*')
      ]],
      nombre: ['', [
        Validators.required,
        Validators.pattern('[A-Za-záéíóúÁÉÍÓÚ]*')
      ]],
      apellido1: ['', [
        Validators.required,
        Validators.pattern('[A-Za-záéíóú]*')
      ]],
      apellido2: ['', [
        Validators.required,
        Validators.pattern('[A-Za-záéíóú]*')
      ]],
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar Usuarios';
    } else {

      this.usuarioService.consultarUsuario(this.route.snapshot.params.cedula).then(res => {
        this.usuario = res;
        this.formUsuario.controls.cedula.setValue(this.usuario.cedula);
        this.formUsuario.controls.correo.setValue(this.usuario.correo);
        this.formUsuario.controls.telefono.setValue(this.usuario.telefono);
        this.formUsuario.controls.nombre.setValue(this.usuario.nombre);
        this.formUsuario.controls.apellido1.setValue(this.usuario.apellido1);
        this.formUsuario.controls.apellido2.setValue(this.usuario.apellido2);
      });

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar Usuarios';
        this.formUsuario.controls.cedula.disable();
      } else {
        this.titulo = 'Visualizar Usuarios';
        this.formUsuario.disable();
      }
    }
  }

  get cedula() {
    return this.formUsuario.get('cedula');
  }
  get correo() {
    return this.formUsuario.get('correo');
  }
  get telefono() {
    return this.formUsuario.get('telefono');
  }
  get nombre() {
    return this.formUsuario.get('nombre');
  }
  get apellido1() {
    return this.formUsuario.get('apellido1');
  }
  get apellido2() {
    return this.formUsuario.get('apellido2');
  }

  private cancelar() {
    this.routeService.navigate(['/usuarios']);
  }

  async agregar() {
    const usuarioNuevo = new UsuarioEntidad();
    usuarioNuevo.cedula = this.formUsuario.controls.cedula.value;
    usuarioNuevo.correo = this.formUsuario.controls.correo.value;
    usuarioNuevo.telefono = this.formUsuario.controls.telefono.value;
    usuarioNuevo.nombre = this.formUsuario.controls.nombre.value;
    usuarioNuevo.apellido1 = this.formUsuario.controls.apellido1.value;
    usuarioNuevo.apellido2 = this.formUsuario.controls.apellido2.value;
    usuarioNuevo.contrasenna = '';

    this.usuarioService.agregar(usuarioNuevo).subscribe(
      result => {
      this.routeService.navigate(['/usuarios']);
      this.abrirDialogoAfirmacion('Usuario agregado correctamente');
    },
      error => {
        this.abrirDialogoError('Error al agregar usuario, inténtelo de nuevo');
      });
  }

  async modificar() {
    const usuarioModificado = new UsuarioEntidad();
    usuarioModificado.cedula = this.formUsuario.controls.cedula.value;
    usuarioModificado.correo = this.formUsuario.controls.correo.value;
    usuarioModificado.telefono = this.formUsuario.controls.telefono.value;
    usuarioModificado.nombre = this.formUsuario.controls.nombre.value;
    usuarioModificado.apellido1 = this.formUsuario.controls.apellido1.value;
    usuarioModificado.apellido2 = this.formUsuario.controls.apellido2.value;
    usuarioModificado.contrasenna = this.usuario.contrasenna;

    this.usuarioService.modificar(usuarioModificado).subscribe(
      result => {
      this.routeService.navigate(['/usuarios']);
      this.abrirDialogoAfirmacion('Usuario modificado correctamente');
    },
      error => {
        this.abrirDialogoError('Error al modificar usuario, inténtelo de nuevo');
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
