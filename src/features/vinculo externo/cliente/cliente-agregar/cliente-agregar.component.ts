import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog} from '@angular/material';
import {ClienteEntidad} from '../../../../shared/entidades/vinculo externo/clienteEntidad';
import {ClienteService} from '../../../../shared/servicios/vinculo externo/cliente/cliente.service';

@Component({
  selector: 'app-cliente-agregar',
  templateUrl: './cliente-agregar.component.html',
  styleUrls: ['./cliente-agregar.component.css']
})
export class ClienteAgregarComponent implements OnInit {

  formClientes: FormGroup;

  // Nombre de la página
  titulo: string;

  // localizacion a editar/visualizar
  cliente: ClienteEntidad;

  // Modo del form
  modoForm: string;

  constructor(private clienteService: ClienteService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.cliente = new ClienteEntidad();

    this.formClientes = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]],
      telefono2: ['', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]],
      correo: ['', [
        Validators.required
      ]],
      fax: ['', [
        Validators.required
      ]],
      direccion: ['', [
        Validators.required
      ]],
      atencionDe: ['', [
        Validators.required
      ]]
    });

    if (this.modoForm === 'agregar' || this.modoForm === 'agregarEnCotizacion') {
      this.titulo = 'Agregar Cliente';
    } else {

      // tslint:disable-next-line:max-line-length
      this.clienteService.consultarCliente(this.route.snapshot.params.nombre).then(res => {
        this.cliente = res;
        this.formClientes.controls.nombre.setValue(this.cliente.nombre);
        this.formClientes.controls.telefono.setValue(this.cliente.telefono);
        this.formClientes.controls.telefono2.setValue(this.cliente.telefono2);
        this.formClientes.controls.correo.setValue(this.cliente.correo);
        this.formClientes.controls.fax.setValue(this.cliente.fax);
        this.formClientes.controls.direccion.setValue(this.cliente.direccion);
        this.formClientes.controls.atencionDe.setValue(this.cliente.contacto);
      });

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar Cliente';
      } else {
        this.titulo = 'Visualizar Cliente';
        this.formClientes.disable();
      }
    }
  }

  get nombre() {
    return this.formClientes.get('nombre');
  }
  get telefono() {
    return this.formClientes.get('telefono');
  }
  get telefono2() {
    return this.formClientes.get('telefono2');
  }
  get correo() {
    return this.formClientes.get('correo');
  }
  get fax() {
    return this.formClientes.get('fax');
  }
  get direccion() {
    return this.formClientes.get('direccion');
  }
  get atencionDe() {
    return this.formClientes.get('atencionDe');
  }

  cancelar() {
    if (this.modoForm === 'agregar') {
      this.routeService.navigate(['/vinculo-externo/clientes']);
    } else {
      this.routeService.navigate(['/vinculo-externo/cotizacion', 'agregar', 'nuevo', 'nuevo']);
    }
  }

  async agregar() {
    const clienteNuevo = new ClienteEntidad();
    clienteNuevo.nombre = this.formClientes.controls.nombre.value;
    clienteNuevo.telefono = this.formClientes.controls.telefono.value;
    clienteNuevo.telefono2 = this.formClientes.controls.telefono2.value;
    clienteNuevo.correo = this.formClientes.controls.correo.value;
    clienteNuevo.fax = this.formClientes.controls.fax.value;
    clienteNuevo.direccion = this.formClientes.controls.direccion.value;
    clienteNuevo.persona_trae_muestra = '';
    clienteNuevo.contacto = this.formClientes.controls.atencionDe.value;

    this.clienteService.agregar(clienteNuevo).subscribe(result => {
      if (this.modoForm === 'agregar') {
        this.routeService.navigate(['/vinculo-externo/clientes']);
      } else {
        this.routeService.navigate(['/vinculo-externo/cotizacion', 'agregar', 'nuevo', 'nuevo']);
      }
      },
      error => {
        this.abrirDialogoError('Error al agregar cliente, inténtelo de nuevo');
      });
  }

  async modificar() {
    const clienteModificado = new ClienteEntidad();
    const nombreViejo = this.route.snapshot.params.nombre;
    clienteModificado.nombre = this.formClientes.controls.nombre.value;
    clienteModificado.telefono = this.formClientes.controls.telefono.value;
    clienteModificado.telefono2 = this.formClientes.controls.telefono2.value;
    clienteModificado.correo = this.formClientes.controls.correo.value;
    clienteModificado.fax = this.formClientes.controls.fax.value;
    clienteModificado.direccion = this.formClientes.controls.direccion.value;
    clienteModificado.persona_trae_muestra = '';
    clienteModificado.contacto =  this.formClientes.controls.atencionDe.value;

    this.clienteService.modificar(clienteModificado, nombreViejo).subscribe(result => {
        this.routeService.navigate(['/vinculo-externo/clientes']);
      },
      error => {
        this.abrirDialogoError('Error al modificar cliente, inténtelo de nuevo');
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
