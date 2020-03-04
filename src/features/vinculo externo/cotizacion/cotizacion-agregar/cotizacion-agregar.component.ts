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
import {CotizacionAnalisisEntidad} from '../../../../shared/entidades/vinculo externo/cotizacionAnalisisEntidad';
import {precioGirasEntidad} from '../../../../shared/entidades/vinculo externo/precioGirasEntidad';
import {precioGirasService} from '../../../../shared/servicios/vinculo externo/precio giras/precioGiras.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GiraEntidad} from '../../../../shared/entidades/vinculo externo/giraEntidad';
import {GiraService} from '../../../../shared/servicios/vinculo externo/giras/gira.service';

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
  // tslint:disable-next-line:variable-name
  precio_por_muestra: number;
  giraHabilitada: boolean;
  botonesHabilitados: boolean;

  public dataSource = new MatTableDataSource<AnalisisEntidad>();

  public displayedColumns: string[] = ['descripcion', 'metodo', 'precio', 'acciones'];

  constructor(private cotizacionService: CotizacionService,
              private grupoService: GruposService,
              private usuarioService: UsuariosService,
              private clienteService: ClienteService,
              private analisisService: AnalisisService,
              private localizacionService: LocalizacionesService,
              private pGirasService: precioGirasService,
              private giraService: GiraService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private http: HttpClient) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.cotizacion = new CotizacionEntidad();
    this.titulo = 'Cotización';

    this.formCotizacion = this.fb.group({
      fechaCotizacion: ['', [
      ]], cotizador: ['', [
      ]], cliente: ['', [
      ]], telefono: ['', [
      ]], telefono2: ['', [
      ]], fax: ['', [
      ]], direccion: ['', [
      ]], correo: ['', [
      ]], contacto: ['', [
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
      ]], cantidadProfesionales: ['', [
      ]], cantidadTecnicos: ['', [
      ]], horasMuestreo: ['', [
      ]], nochesAlojamiento: ['', [
      ]], provincia: ['', [
      ]], canton: ['', [
      ]], localidad: ['', [
      ]], totalGira: ['', [
      ]], licitacion: ['', [
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
      ]], iva: ['', [
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
      ]], consecutivo: ['', [
      ]]
    });

    this.formCotizacion.disable();
    this.formCotizacion.controls.cliente.enable();

    this.cargarCotizadores();
    this.cargarClientes();
    this.cargarProvincias();
    this.consultarTipos();
    this.listaAnalisis = [];
    this.cargarFirmantes();
    this.cargarQuimicos();

    this.formCotizacion.controls.numeroMuestras.setValue(0);
    this.formCotizacion.controls.entregaResultados.setValue(0);
    this.formCotizacion.controls.cantidadNecesaria.setValue(0);
    this.formCotizacion.controls.descuento.setValue(0);
    this.formCotizacion.controls.gastosAdm.setValue(0);
    this.formCotizacion.controls.descuento2.setValue(0);
    this.formCotizacion.controls.gastosAdm2.setValue(0);
    this.formCotizacion.controls.precioMuestreo.setValue(0);

    this.giraHabilitada = false;
    this.botonesHabilitados = false;

    if (this.modoForm === 'agregar') {
      this.formCotizacion.controls.consecutivo.setValue('####-####');
      this.precio_por_muestra = 0;
    } else {
      this.cotizacionService.consultarCotizacion(this.route.snapshot.params.id, this.route.snapshot.params.anno).then(res => {
        const cotizacion = res;

        this.formCotizacion.controls.consecutivo.setValue(this.zerofill(cotizacion.id, 4) + '-' + cotizacion.anno);
        this.formCotizacion.controls.fechaCotizacion.setValue(cotizacion.fechaCotizacion);
        this.formCotizacion.controls.cotizador.setValue(cotizacion.cotizador);
        this.formCotizacion.controls.cliente.setValue(cotizacion.cliente);
        this.consultarCliente(cotizacion.cliente);
        this.formCotizacion.controls.especifique.setValue(cotizacion.especifique);
        this.formCotizacion.controls.numeroMuestras.setValue(cotizacion.numeroMuestras);
        this.formCotizacion.controls.precioUnitario.setValue(cotizacion.precioMuestra);
        console.log(this.formCotizacion.controls.precioUnitario.value);
        this.formCotizacion.controls.entregaResultados.setValue(cotizacion.diasEntregaRes);
        this.formCotizacion.controls.cantidadNecesaria.setValue(cotizacion.cantidadNecesaria);
        this.formCotizacion.controls.unidades.setValue(cotizacion.unidadMedida);
        this.formCotizacion.controls.descuento.setValue(cotizacion.descuento);
        this.formCotizacion.controls.gastosAdm.setValue(cotizacion.gastosAdm);
        this.formCotizacion.controls.descuento2.setValue((cotizacion.descuento / 100) * cotizacion.subTotal);
        this.formCotizacion.controls.gastosAdm2.setValue((cotizacion.gastosAdm / 100) * cotizacion.subTotal);
        this.formCotizacion.controls.precioMuestreo.setValue(cotizacion.precioMuestreo);
        this.formCotizacion.controls.subtotal.setValue(cotizacion.subTotal);
        console.log(cotizacion.licitacion);
        if (cotizacion.licitacion === true) {
          this.formCotizacion.controls.licitacion.setValue(false);
        } else {
          this.formCotizacion.controls.licitacion.setValue(true);
        }
        this.generarObservaciones();
        this.formCotizacion.controls.precioUnitario.setValue(cotizacion.precioMuestras);
        this.formCotizacion.controls.iva.setValue(cotizacion.iva);
        this.formCotizacion.controls.granTotal.setValue(cotizacion.granTotal);
        this.formCotizacion.controls.fechaSolicitud.setValue(cotizacion.fechaSolicitud);
        this.formCotizacion.controls.usuarioQuimico.setValue(cotizacion.usuarioQuimico);
        this.formCotizacion.controls.fechaRespuesta.setValue(cotizacion.fechaRespuesta);
        this.formCotizacion.controls.usuarioFirmante.setValue(cotizacion.usuarioFirmante);

        this.llenarTabla(cotizacion.id, cotizacion.anno);
        if (this.modoForm === 'visualizar') {
          this.formCotizacion.disable();
        }
        this.consultar_gira(cotizacion.id, cotizacion.anno);
      });
    }
  }

  zerofill(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }

  llenarTabla(id: number, anno: number) {
    this.cotizacionService.consultarAnalisis(id, anno).subscribe(
      cotAnalisis => {
        for (const analisisCot of cotAnalisis) {
          this.analisisService.consultarAnalisis(analisisCot.descripcion, analisisCot.tipoMuestra).then(analisis => {
            this.listaAnalisis.push(analisis);
            this.dataSource.data = this.listaAnalisis;
          });
        }
      });
  }

  consultar_gira(id: number, anno: number) {
    this.giraService.consultarGiraCotizacion(id, anno).then(gira => {
      if (gira) {
        this.formCotizacion.controls.provincia.setValue(gira.provincia);
        this.cargarCantones(gira.provincia);
        this.cargarLocalidades(gira.canton);
        this.formCotizacion.controls.canton.setValue(gira.canton);
        this.formCotizacion.controls.localidad.setValue(gira.localidad);
        this.formCotizacion.controls.canton.disable();
        this.formCotizacion.controls.localidad.disable();
        this.formCotizacion.controls.cantidadTecnicos.setValue(gira.cantidadTecnicos);
        this.formCotizacion.controls.cantidadProfesionales.setValue(gira.cantidadProfesionales);
        this.formCotizacion.controls.nochesAlojamiento.setValue(gira.nochesAlojamiento);
        this.formCotizacion.controls.horasMuestreo.setValue(gira.horasMuestreo);
        this.formCotizacion.controls.totalGira.setValue(gira.gastoTotal);
      }
    });
  }

  cargarClientes() {
    this.clienteService.consultar().subscribe(
      cliente => {
        this.clientes = cliente as ClienteEntidad[];
      });
  }

  selected() {
    if (this.modoForm === 'agregar') {
      return '';
    } else {
      console.log('carga?');
      return 'Sirve';
    }
  }

  private consultarTipos() {
    this.analisisService.consultar_tipoMuestra().subscribe(res => {
      this.listaTiposMuestra = res;
    });
  }

  actualizar_observaciones() {
    if (this.formCotizacion.controls.especifique.value !== '' && this.formCotizacion.controls.numeroMuestras.value > 0 &&
    this.formCotizacion.controls.cantidadNecesaria.value > 0 && this.formCotizacion.controls.unidades.value !== '') {
      this.generarObservaciones();
    } else {
      this.formCotizacion.controls.observaciones.setValue('');
    }
  }

  generarObservaciones() {
    let texto = '';
    if (this.formCotizacion.controls.numeroMuestras.value === 1) {
      texto += 'Esta cotización corresponde a una muestra de ' + this.formCotizacion.controls.especifique.value + '\n';
    } else {
      texto += 'Esta cotización corresponde a ' + this.formCotizacion.controls.numeroMuestras.value + ' muestras de ' +
        this.formCotizacion.controls.especifique.value + '\n';
    }
    // tslint:disable-next-line:max-line-length
    texto += 'Para los ensayos se requiere al menos ' + this.formCotizacion.controls.cantidadNecesaria.value + this.formCotizacion.controls.unidades.value +
      ' de muestra' + '\n' +
      'La fecha de entrega de los resultados puede variar en función de la fecha de recepción de las muestras y del' +
      'volúmen de trabajo que en ese momento se tenga' + '\n';
    this.formCotizacion.controls.observaciones.setValue(texto);
  }

  cargarCotizadores() {
    this.grupoService.consultarUsuariosGrupo('Secretaría VE').subscribe(
      cotizador => {
        this.cotizadores = cotizador as UsuarioEntidad[];
      });
  }

  habilitarBotones() {
    this.botonesHabilitados = true;
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

  cargarFirmantes() {
    this.grupoService.consultarUsuariosGrupo('IQA').subscribe(
      firmante => {
        this.firmantes = firmante as UsuarioEntidad[];
      });
  }

  cargarQuimicos() {
    this.grupoService.consultarUsuariosGrupo('IQS').subscribe(
      quimico => {
        this.quimicos = quimico as UsuarioEntidad[];
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

    this.formCotizacion.controls.fechaCotizacion.enable();
    this.formCotizacion.controls.cotizador.enable();
    this.formCotizacion.controls.especifique.enable();
    this.formCotizacion.controls.numeroMuestras.enable();
    this.formCotizacion.controls.entregaResultados.enable();
    this.formCotizacion.controls.cantidadNecesaria.enable();
    this.formCotizacion.controls.unidades.enable();
    this.formCotizacion.controls.requiereGira.enable();
    this.formCotizacion.controls.licitacion.enable();
    this.formCotizacion.controls.tipoMuestra.enable();
    this.formCotizacion.controls.descuento.enable();
    this.formCotizacion.controls.gastosAdm.enable();
    this.formCotizacion.controls.precioMuestreo.enable();
    this.formCotizacion.controls.fechaSolicitud.enable();
    this.formCotizacion.controls.usuarioQuimico.enable();
    this.formCotizacion.controls.fechaRespuesta.enable();
    this.formCotizacion.controls.usuarioFirmante.enable();
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
        this.sumar_precio_por_muestra(result.precio);
        this.calcular_total();
        this.formCotizacion.controls.precioUnitario.setValue(this.precio_por_muestra);
      }
    });
  }

  public eliminar_analisis(analisis: AnalisisEntidad) {
    const index: number = this.listaAnalisis.indexOf(analisis);
    if (index !== -1) {
      this.listaAnalisis.splice(index, 1);
      this.restar_precio_por_muestra(analisis.precio);
      this.dataSource.data = this.listaAnalisis;
      this.calcular_total();
    }
    if (this.modoForm === 'editar') {
      // tslint:disable-next-line:max-line-length
      this.cotizacionService.eliminarCotizacionAnalisis(this.route.snapshot.params.id, this.route.snapshot.params.anno, analisis.descripcion, analisis.tipoMuestra);
    }
  }

  actualizar_costos() {
    this.actualizar_gastosAdm();
    this.actualizar_descuento();
  }

  actualizar_gastosAdm() {
    // tslint:disable-next-line:max-line-length
    const total = (this.precio_por_muestra * this.formCotizacion.controls.cantidadNecesaria.value) + this.formCotizacion.controls.precioMuestreo.value;
    const gastos = ( (this.formCotizacion.controls.gastosAdm.value / 100) * total);
    this.formCotizacion.controls.gastosAdm2.setValue(gastos.toFixed(2));
    this.calcular_total();
  }

  actualizar_descuento() {
    // tslint:disable-next-line:max-line-length
    const total = (this.precio_por_muestra * this.formCotizacion.controls.cantidadNecesaria.value)  + this.formCotizacion.controls.precioMuestreo.value;
    const desc = ( (this.formCotizacion.controls.descuento.value / 100) * total);
    this.formCotizacion.controls.descuento2.setValue(desc.toFixed(2));
    this.calcular_total();
  }

  calcular_total() {
    // tslint:disable-next-line:max-line-length
    let total = (this.precio_por_muestra * this.formCotizacion.controls.cantidadNecesaria.value) + this.formCotizacion.controls.precioMuestreo.value;
    if (this.formCotizacion.controls.cantidadProfesionales.enabled) {
      total = ( (+total) + (+parseFloat(this.formCotizacion.controls.totalGira.value)) );
    }
    this.formCotizacion.controls.subtotal.setValue(parseFloat(total).toFixed(2));

    const desc = this.formCotizacion.controls.descuento2.value;
    const gastos = this.formCotizacion.controls.gastosAdm2.value;
    total = (+total) - (+desc);
    total = (+total) + (+gastos);
    const iva = ( (+total) * 0.02 );
    total = (+total) + (+iva);

    this.formCotizacion.controls.granTotal.setValue(parseFloat(total).toFixed(2));
    this.formCotizacion.controls.iva.setValue(iva.toFixed(2));
  }

  sumar_precio_por_muestra(precio: number) {
    this.precio_por_muestra = this.precio_por_muestra + precio;
    this.formCotizacion.controls.precioUnitario.setValue(this.precio_por_muestra);
  }

  restar_precio_por_muestra(precio: number) {
    this.precio_por_muestra = this.precio_por_muestra - precio;
    this.formCotizacion.controls.precioUnitario.setValue(this.precio_por_muestra);
  }

  cancelar() {
    this.routeService.navigate(['/vinculo-externo/cotizacion']);
  }

  habilitarGira() {
    if (this.formCotizacion.controls.cantidadProfesionales.disabled) {
      this.formCotizacion.controls.cantidadProfesionales.enable();
      this.formCotizacion.controls.cantidadTecnicos.enable();
      this.formCotizacion.controls.horasMuestreo.enable();
      this.formCotizacion.controls.nochesAlojamiento.enable();
      this.formCotizacion.controls.provincia.enable();
      this.formCotizacion.controls.canton.enable();
      this.formCotizacion.controls.localidad.enable();
      this.giraHabilitada = true;
      this.formCotizacion.controls.totalGira.setValue(0);
      this.calcular_total();
    } else {
      this.formCotizacion.controls.cantidadProfesionales.reset();
      this.formCotizacion.controls.cantidadTecnicos.reset();
      this.formCotizacion.controls.horasMuestreo.reset();
      this.formCotizacion.controls.nochesAlojamiento.reset();
      this.formCotizacion.controls.provincia.reset();
      this.formCotizacion.controls.canton.reset();
      this.formCotizacion.controls.localidad.reset();

      this.formCotizacion.controls.cantidadProfesionales.disable();
      this.formCotizacion.controls.cantidadTecnicos.disable();
      this.formCotizacion.controls.horasMuestreo.disable();
      this.formCotizacion.controls.nochesAlojamiento.disable();
      this.formCotizacion.controls.provincia.disable();
      this.formCotizacion.controls.canton.disable();
      this.formCotizacion.controls.localidad.disable();
      this.giraHabilitada = false;
      this.formCotizacion.controls.totalGira.setValue(0);
      this.calcular_total();
    }
  }

  calcular_gira() {
    let localizacion = new LocalizacionEntidad();
    this.localizacionService.consultarLocalizacion(this.formCotizacion.controls.provincia.value,
      this.formCotizacion.controls.canton.value, this.formCotizacion.controls.localidad.value).then(result => {
        localizacion = result;
      });
    let valorK = 0;
    let valorT = 0;
    let valorP = 0;
    this.pGirasService.consultar().subscribe(result => {
      const precios = result;
      for (const precio of precios) {
        if (precio.variable === 'valorKilometro') {
          valorK = precio.valor;
        } else if (precio.variable === 'valorProfesional') {
          valorP = precio.valor;
        } else {
          valorT = precio.valor;
        }
      }

      const horasViaje = (((localizacion.distancia * 2) / 80) * 1.25);
      // tslint:disable-next-line:max-line-length
      const profesional = (this.formCotizacion.controls.horasMuestreo.value + horasViaje) * valorP * this.formCotizacion.controls.cantidadProfesionales.value;
      // tslint:disable-next-line:max-line-length
      const tecnico = (this.formCotizacion.controls.horasMuestreo.value + horasViaje) * valorT * this.formCotizacion.controls.cantidadTecnicos.value;

      let totalGira = 0;

      this.cotizacionService.consultar_tipo_cambio().subscribe(
        cambio => {
          const pb = cambio.toString();
          const dolar = parseFloat(pb);
          // tslint:disable-next-line:max-line-length
          totalGira =  ( (localizacion.distancia * 2 * valorK) + profesional + tecnico + ( (localizacion.hospedaje * this.formCotizacion.controls.nochesAlojamiento.value) / dolar));
          if (Object.is(totalGira, NaN)) {
            this.formCotizacion.controls.totalGira.setValue(0);
          } else {
            this.formCotizacion.controls.totalGira.setValue(totalGira.toFixed(2));
          }
        });
    });
    if (this.formCotizacion.controls.totalGira.value !== 0) {
      this.calcular_total();
    }
  }

  async agregar() {
    const cotizacionNueva = new CotizacionEntidad();
    let cotizacionAgregada = new CotizacionEntidad();

    cotizacionNueva.anno = new Date().getFullYear();
    cotizacionNueva.licitacion = this.formCotizacion.controls.licitacion.value;
    cotizacionNueva.observaciones = this.formCotizacion.controls.observaciones.value;
    cotizacionNueva.precioMuestreo = this.formCotizacion.controls.precioMuestreo.value;
    cotizacionNueva.descuento = this.formCotizacion.controls.descuento2.value;
    cotizacionNueva.gastosAdm = this.formCotizacion.controls.gastosAdm2.value;
    cotizacionNueva.fechaCotizacion = this.formCotizacion.controls.fechaCotizacion.value;
    cotizacionNueva.fechaSolicitud = this.formCotizacion.controls.fechaSolicitud.value;
    cotizacionNueva.fechaRespuesta = this.formCotizacion.controls.fechaRespuesta.value;
    cotizacionNueva.iva = this.formCotizacion.controls.iva.value;
    cotizacionNueva.granTotal = this.formCotizacion.controls.granTotal.value;
    cotizacionNueva.moneda = 'C';
    cotizacionNueva.cotizador = this.formCotizacion.controls.cotizador.value;
    cotizacionNueva.cliente = this.formCotizacion.controls.cliente.value;
    cotizacionNueva.precioMuestra = this.formCotizacion.controls.precioUnitario.value;
    cotizacionNueva.diasEntregaRes = this.formCotizacion.controls.entregaResultados.value;
    cotizacionNueva.subTotal = this.formCotizacion.controls.subtotal.value;
    cotizacionNueva.numeroMuestras = this.formCotizacion.controls.numeroMuestras.value;
    cotizacionNueva.usuarioQuimico = this.formCotizacion.controls.usuarioQuimico.value;
    cotizacionNueva.usuarioFirmante = this.formCotizacion.controls.usuarioFirmante.value;
    cotizacionNueva.cantidadNecesaria = this.formCotizacion.controls.cantidadNecesaria.value;
    cotizacionNueva.unidadMedida = this.formCotizacion.controls.unidades.value;
    cotizacionNueva.especifique = this.formCotizacion.controls.especifique.value;

    this.cotizacionService.agregar(cotizacionNueva).subscribe(result => {
        this.routeService.navigate(['/vinculo-externo/cotizacion']);
        cotizacionAgregada = result;
        for (const analisis of this.listaAnalisis) {
          const cotAnalisis = new CotizacionAnalisisEntidad();
          cotAnalisis.idCotizacion = cotizacionAgregada.id;
          cotAnalisis.annoCotizacion = cotizacionNueva.anno;
          cotAnalisis.descripcion = analisis.descripcion;
          cotAnalisis.tipoMuestra = analisis.tipoMuestra;
          this.cotizacionService.agregarCotizacionAnalisis(cotAnalisis).subscribe( result => {
            },
            error => {
              this.abrirDialogoError('Error al insertar análisis en cotización');
            });
        }
        if (this.giraHabilitada) {
          const gira = new GiraEntidad();
          gira.idCotizacion = cotizacionAgregada.id;
          gira.annoCotizacion = cotizacionAgregada.anno;
          gira.provincia = this.formCotizacion.controls.provincia.value;
          gira.canton = this.formCotizacion.controls.canton.value;
          gira.localidad = this.formCotizacion.controls.localidad.value;
          gira.cantidadTecnicos = this.formCotizacion.controls.cantidadTecnicos.value;
          gira.cantidadProfesionales = this.formCotizacion.controls.cantidadProfesionales.value;
          gira.nochesAlojamiento = this.formCotizacion.controls.nochesAlojamiento.value;
          gira.horasMuestreo = this.formCotizacion.controls.horasMuestreo.value;
          gira.gastoTotal = this.formCotizacion.controls.gastoTotal.value;
          this.giraService.agregar(gira).subscribe( result => {
            },
            error => {
              this.abrirDialogoError('Error al insertar gira');
            });
        }
      },
      error => {
        this.abrirDialogoError('Error al agregar cotización, inténtelo de nuevo');
      });

  }

  async modificar() {
    const cotizacionModificada = new CotizacionEntidad();

    this.cotizacionService.modificar(cotizacionModificada).subscribe(result => {
        this.routeService.navigate(['/vinculo-externo/cotizacion']);
      },
      error => {
        this.abrirDialogoError('Error al modificar cotización, inténtelo de nuevo');
      });
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
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
  get iva() {
    return this.formCotizacion.get('iva');
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
  get consecutivo() {
    return this.formCotizacion.get('consecutivo');
  }
}
