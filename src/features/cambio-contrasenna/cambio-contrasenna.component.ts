import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../shared/servicios/seguridad/authentication.service';
import {UsuariosService} from '../../shared/servicios/usuarios/usuarios.service';
import {UsuarioEntidad} from '../../shared/entidades/usuarioEntidad';
import {DialogoConfirmacionComponent} from '../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-cambio-contrasenna',
  templateUrl: './cambio-contrasenna.component.html',
  styleUrls: ['./cambio-contrasenna.component.css']
})
export class CambioContrasennaComponent implements OnInit {

  formCorreo: FormGroup;
  formContrasenna: FormGroup;
  correoUsuario: string;
  id: string;
  mensajeCorreo: string;
  error: boolean;

  constructor(private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              private authService: AuthenticationService,
              private usuariosService: UsuariosService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.correoUsuario = this.route.snapshot.params.correo;
    this.mensajeCorreo = '';
    if (this.id === 'correo') {
      this.formCorreo = this.fb.group({
        correo: ['', [
          Validators.required,
          Validators.email
        ]]
      });
    } else {
      this.formContrasenna = this.fb.group({
        contrasenna: ['', [
          Validators.required
        ]],
        repetirContrasenna: ['', [
          Validators.required
        ]]
      });
      this.authService.checkPasswordChangeId({correo: this.correoUsuario, id: this.id}).subscribe(result => {
        this.error = false;

      }, err => {
        this.error = true;
      });

    }
  }

  get correo() {
    return this.formCorreo.get('correo');
  }
  get contrasenna() {
    return this.formContrasenna.get('contrasenna');
  }
  get repetirContrasenna() {
    return this.formContrasenna.get('repetirContrasenna');
  }

  cancelar() {
    this.routeService.navigate(['/login']);
  }

  enviarCorreo() {
    this.authService.genertePasswordChangeId(this.formCorreo.get('correo').value).subscribe(res => {
      this.mensajeCorreo = 'Se ha enviado el correo de forma correcta. Por favor entrar al enlace enviado';
    }, err => {
      this.mensajeCorreo = err.error;
    });
  }

  cambiarContrasenna() {
    if (this.formContrasenna.get('contrasenna').value === this.formContrasenna.get('repetirContrasenna').value) {
      const sha1 = require('sha1');
      let usuario = new UsuarioEntidad();
      this.usuariosService.consultarUsuarioCorreo(this.correoUsuario).then(res => {
        usuario = res;
        usuario.contrasenna = sha1(this.formContrasenna.get('contrasenna').value);
        this.actualizarUsuario(usuario);
      }, err => {
        this.abrirDialogoError('Ha ocurrido un error al cambiar la contraseña');
      });

    } else {
      this.abrirDialogoError('Las contraseñas no coinciden');
    }

  }

  actualizarUsuario(usuario: UsuarioEntidad) {
    this.usuariosService.modificar(usuario).subscribe(res => {
      this.abrirDialogoAfirmacion('Se ha cambiado la contraseña de manera correcta');
    }, err => {
      this.abrirDialogoError('Ha ocurrido un error al cambiar la contraseña');
    });
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

  private abrirDialogoAfirmacion(mensaje: string) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'afirmacion'}
      });
    dialogRef.afterClosed().subscribe(res => {
      this.routeService.navigate(['/login']);
    });
  }
}
