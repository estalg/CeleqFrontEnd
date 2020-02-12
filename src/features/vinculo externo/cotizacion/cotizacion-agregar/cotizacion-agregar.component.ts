import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {CotizacionEntidad} from '../../../../shared/entidades/vinculo externo/cotizacionEntidad';
import {CotizacionService} from '../../../../shared/servicios/vinculo externo/cotizacion/cotizacion.service';
import {GruposService} from '../../../../shared/servicios/grupos/grupos.service';
import {UsuarioEntidad} from '../../../../shared/entidades/usuarioEntidad';
import {UsuariosService} from '../../../../shared/servicios/usuarios/usuarios.service';
import {ClienteEntidad} from '../../../../shared/entidades/vinculo externo/clienteEntidad';
import {ClienteService} from '../../../../shared/servicios/vinculo externo/cliente/cliente.service';
import {LocalizacionEntidad} from '../../../../shared/entidades/vinculo externo/localizacionEntidad';
import {LocalizacionesService} from '../../../../shared/servicios/vinculo externo/localizaciones/localizaciones.service';
import {AnalisisEntidad} from '../../../../shared/entidades/vinculo externo/analisisEntidad';
import {SeleccionarAnalisisCotizacionComponent} from '../seleccionar-analisis-cotizacion/seleccionar-analisis-cotizacion.component';
import {AnalisisService} from '../../../../shared/servicios/vinculo externo/analisis/analisis.service';

// Falta abrir la lista de analisis cuando presiona los botones
@Component({
  selector: 'app-cotizacion-agregar',
  templateUrl: './cotizacion-agregar.component.html',
  styleUrls: ['./cotizacion-agregar.component.css']
})
export class CotizacionAgregarComponent implements OnInit {

  formCotizacion: FormGroup;
  titulo: string;
  cotizacion: CotizacionEntidad;
  modoForm: string;
  cotizadores: UsuarioEntidad[];
  clientes: ClienteEntidad[];
  clienteActual: ClienteEntidad;
  provincias: LocalizacionEntidad[];
  cantones: LocalizacionEntidad[];
  localidades: LocalizacionEntidad[];
  quimicos: UsuarioEntidad[];
  firmantes: UsuarioEntidad[];
  listaAnalisis: AnalisisEntidad[];
  listaTiposMuestra: AnalisisEntidad[];

  public dataSource = new MatTableDataSource<AnalisisEntidad>();

  public displayedColumns: string[] = ['descripcion', 'metodo', 'precio', 'acciones'];

  constructor(private cotizacionService: CotizacionService,
              private grupoService: GruposService,
              private usuarioService: UsuariosService,
              private clienteService: ClienteService,
              private analisisService: AnalisisService,
              private localizacionService: LocalizacionesService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.cotizacion = new CotizacionEntidad();
    this.titulo = 'Cotización';

    this.formCotizacion = this.fb.group({
      fechaCotizacion: ['', [
        Validators.required
      ]], cotizador: ['', [
        Validators.required
      ]], cliente: ['', [
        Validators.required
      ]], telefono: ['', [
        Validators.required
      ]], telefono2: ['', [
        Validators.required
      ]], fax: ['', [
        Validators.required
      ]], direccion: ['', [
        Validators.required
      ]], correo: ['', [
        Validators.required
      ]], contacto: ['', [
        Validators.required
      ]], tipoMuestra: ['', [
        Validators.required
      ]], especifique: ['', [
        Validators.required
      ]], numeroMuestras: ['', [
        Validators.required
      ]], entregaResultados: ['', [
        Validators.required
      ]], diasHabiles: ['', [
        Validators.required
      ]], cantidadNecesaria: ['', [
        Validators.required
      ]], unidades: ['', [
        Validators.required
      ]], requiereGira: ['', [
        Validators.required
      ]], cantidadProfesionales: ['', [
        Validators.required
      ]], cantidadTecnicos: ['', [
        Validators.required
      ]], horasMuestreo: ['', [
        Validators.required
      ]], nochesAlojamiento: ['', [
        Validators.required
      ]], provincia: ['', [
        Validators.required
      ]], canton: ['', [
        Validators.required
      ]], localidad: ['', [
        Validators.required
      ]], totalGira: ['', [
        Validators.required
      ]], licitacion: ['', [
        Validators.required
      ]], observaciones: ['', [
        Validators.required
      ]], precioUnitario: ['', [
        Validators.required
      ]], precioMuestreo: ['', [
        Validators.required
      ]], subtotal: ['', [
        Validators.required
      ]], descuento: ['', [
        Validators.required
      ]], descuento2: ['', [
        Validators.required
      ]], gastosAdm: ['', [
        Validators.required
      ]], gastosAdm2: ['', [
        Validators.required
      ]], saldoAfavor: ['', [
        Validators.required
      ]], granTotal: ['', [
        Validators.required
      ]], fechaSolicitud: ['', [
        Validators.required
      ]], usuarioQuimico: ['', [
        Validators.required
      ]], fechaRespuesta: ['', [
        Validators.required
      ]], usuarioFirmante: ['', [
        Validators.required
      ]]
    });

    this.formCotizacion.controls.telefono.disable();
    this.formCotizacion.controls.telefono2.disable();
    this.formCotizacion.controls.fax.disable();
    this.formCotizacion.controls.direccion.disable();
    this.formCotizacion.controls.correo.disable();
    this.formCotizacion.controls.contacto.disable();

    this.cargarCotizadores();
    this.cargarClientes();
    this.cargarProvincias();
    this.consultarTipos();
    this.listaAnalisis = [];
  }

  cargarClientes() {
    this.clienteService.consultar().subscribe(
      cliente => {
        this.clientes = cliente as ClienteEntidad[];
      });
  }

  private consultarTipos() {
    this.analisisService.consultar_tipoMuestra().subscribe(res => {
      this.listaTiposMuestra = res;
    });
  }

  cargarCotizadores() {
    this.grupoService.consultarUsuariosGrupo('Secretaría VE').subscribe(
      cotizador => {
        this.cotizadores = cotizador as UsuarioEntidad[];
      });
  }

  cargarProvincias() {
    this.formCotizacion.controls.canton.disable();
    this.formCotizacion.controls.localidad.disable();
    this.localizacionService.consultarProvincias().subscribe(
      provincia => {
        this.provincias = provincia as LocalizacionEntidad[];
      });
  }

  async cargarCantones(provincia: string) {
    this.formCotizacion.controls.canton.enable();
    this.localizacionService.filtarProvincia(provincia).subscribe(
      canton => {
        this.cantones = canton as LocalizacionEntidad[];
      });
  }

  cargarLocalidades(canton: string) {
    this.formCotizacion.controls.localidad.enable();
    this.localizacionService.filtarCanton(canton).subscribe(
      localidad => {
        this.localidades = localidad as LocalizacionEntidad[];
      });
  }

  consultarCliente(nombre: string) {
    this.clienteService.consultarCliente(nombre).then(res => {
      this.clienteActual = res;

      this.formCotizacion.controls.telefono.setValue(this.clienteActual.telefono);
      this.formCotizacion.controls.telefono2.setValue(this.clienteActual.telefono2);
      this.formCotizacion.controls.fax.setValue(this.clienteActual.fax);
      this.formCotizacion.controls.direccion.setValue(this.clienteActual.direccion);
      this.formCotizacion.controls.correo.setValue(this.clienteActual.correo);
      this.formCotizacion.controls.contacto.setValue(this.clienteActual.contacto);
    });
  }

  private abrirDialogoListaAnalisis(tipoMuestra: string) {
    const dialogRef = this.dialog.open(SeleccionarAnalisisCotizacionComponent,
      {
        width: '1000px',
        height: '800px',
        data: {tipoMuestra}
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.listaAnalisis.push(result);
        this.dataSource.data = this.listaAnalisis;
      }
    });
  }

  get fechaCotizacion() {
    return this.formCotizacion.get('fechaCotizacion');
  }
  get cotizador() {
    return this.formCotizacion.get('cotizador');
  }
  get telefono() {
    return this.formCotizacion.get('telefono');
  }
  get telefono2() {
    return this.formCotizacion.get('telefono2');
  }
  get fax() {
    return this.formCotizacion.get('fax');
  }
  get direccion() {
    return this.formCotizacion.get('direccion');
  }
  get correo() {
    return this.formCotizacion.get('correo');
  }
  get contacto() {
    return this.formCotizacion.get('contacto');
  }
  get tipoMuestra() {
    return this.formCotizacion.get('tipoMuestra');
  }
  get especifique() {
    return this.formCotizacion.get('especifique');
  }
  get numeroMuestras() {
    return this.formCotizacion.get('numeroMuestras');
  }
  get cantidadNecesaria() {
    return this.formCotizacion.get('cantidadNecesaria');
  }
  get entregaResultados() {
    return this.formCotizacion.get('entregaresultados');
  }
  get diasHabiles() {
    return this.formCotizacion.get('diasHabiles');
  }
  get unidades() {
    return this.formCotizacion.get('unidades');
  }
  get requiereGira() {
    return this.formCotizacion.get('requiereGira');
  }
  get cantidadProfesionales() {
    return this.formCotizacion.get('cantidadProfesionales');
  }
  get cantidadTecnicos() {
    return this.formCotizacion.get('cantidadTecnicos');
  }
  get horasMuestreo() {
    return this.formCotizacion.get('horasMuestreo');
  }
  get nochesAlojamiento() {
    return this.formCotizacion.get('nochesAlojamiento');
  }
  get provincia() {
    return this.formCotizacion.get('provincia');
  }
  get canton() {
    return this.formCotizacion.get('canton');
  }
  get localidad() {
    return this.formCotizacion.get('localidad');
  }
  get totalGira() {
    return this.formCotizacion.get('totalGira');
  }
  get licitacion() {
    return this.formCotizacion.get('licitacion');
  }
  get observaciones() {
    return this.formCotizacion.get('observaciones');
  }
  get precioUnitario() {
    return this.formCotizacion.get('precioUnitario');
  }
  get precioMuestreo() {
    return this.formCotizacion.get('precioMuestreo');
  }
  get subtotal() {
    return this.formCotizacion.get('subtotal');
  }
  get descuento() {
    return this.formCotizacion.get('descuento');
  }
  get descuento2() {
    return this.formCotizacion.get('descuento2');
  }
  get gastosAdm() {
    return this.formCotizacion.get('gastosAdm');
  }
  get gastosAdm2() {
    return this.formCotizacion.get('gastosAdm2');
  }
  get saldoAfavor() {
    return this.formCotizacion.get('saldoAfavor');
  }
  get granTotal() {
    return this.formCotizacion.get('granTotal');
  }
  get fechaSolicitud() {
    return this.formCotizacion.get('fechaSolicitud');
  }
  get usuarioQuimico() {
    return this.formCotizacion.get('usuarioQuimico');
  }
  get fechaRespuesta() {
    return this.formCotizacion.get('fechaRespuesta');
  }
  get usuarioFirmante() {
    return this.formCotizacion.get('usuarioFirmante');
  }
}
