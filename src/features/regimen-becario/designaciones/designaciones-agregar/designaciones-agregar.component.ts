import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DesignacionEntidad} from '../../../../shared/entidades/regimen becario/designacionEntidad';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {EstudianteEntidad} from '../../../../shared/entidades/regimen becario/estudianteEntidad';
import {DesignacionesService} from '../../../../shared/servicios/regimen becario/designaciones/designaciones.service';
import {UsuariosService} from '../../../../shared/servicios/usuarios/usuarios.service';
import {UsuarioEntidad} from '../../../../shared/entidades/usuarioEntidad';
import {UnidadEntidad} from '../../../../shared/entidades/unidad/unidadEntidad';
import {UnidadesService} from '../../../../shared/servicios/unidades/unidades.service';
import {PresupuestoEntidad} from '../../../../shared/entidades/regimen becario/PresupuestoEntidad';
import {PresupuestosService} from '../../../../shared/servicios/regimen becario/presupuestos/presupuestos.service';
import {max} from 'rxjs/operators';
import {P9Entidad} from '../../../../shared/entidades/regimen becario/p9Entidad';
import {UploadService} from '../../../../shared/servicios/upload/upload.service';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-designaciones-agregar',
  templateUrl: './designaciones-agregar.component.html',
  styleUrls: ['./designaciones-agregar.component.css']
})
export class DesignacionesAgregarComponent implements OnInit {

  private formDesignacion: FormGroup;

  private formEstudiante: FormGroup;

  // Nombre de la página
  private titulo: string;

  // Usuario a editar/visualizar
  private designacion: DesignacionEntidad;

  // Modo del form
  private modoForm: string;

  // Lista de estudiantes del sistema
  private listaEstudiantes: EstudianteEntidad[];

  // Lista de usuarios en el sistema
  private listaUsuarios: UsuarioEntidad[];

  // Lista de unidades
  private listaUnidades: UnidadEntidad[];

  // Lista de presupuestos
  private listaPresupuesto: PresupuestoEntidad[];

  private uploadResponse: string;

  constructor(private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private designacionesService: DesignacionesService,
              private usuariosService: UsuariosService,
              private unidadesService: UnidadesService,
              private presupuestoService: PresupuestosService,
              private uploadService: UploadService) { }

  ngOnInit() {
    this.consultarEstudiantes();
    this.consultarUsuarios();
    this.consultarUnidades();
    this.consultarPresupuestos();

    this.modoForm = this.route.snapshot.params.modo;
    this.designacion = new DesignacionEntidad();

    this.formEstudiante = this.fb.group({
      id: ['', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(9)
      ]],
      tipoId: ['', [
        Validators.required
      ]],
      nombre: ['', [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚ]*')
      ]],
      apellido1: ['', [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚ]*')
      ]],
      apellido2: ['', [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern('[a-zA-Z áéíóúÁÉÍÓÚ]*')
      ]],
      correo: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]],
      celular: ['', [
        Validators.pattern('[0-9]*'),
        Validators.maxLength(8)
      ]],
      telefonoFijo: ['', [
        Validators.pattern('[0-9]*'),
        Validators.maxLength(8)
      ]],
      carrera: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]]
    });

    this.formDesignacion = this.fb.group({
      responsable: ['', [
        Validators.required
      ]],
      unidad: ['', [
        Validators.required
      ]],
      ciclo: ['', [
        Validators.required
      ]],
      anno: ['', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]],
      horas: ['', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.max(20),
      ]],
      modalidad: ['', [
        Validators.required
      ]],
      adHonorem: [false],
      presupuesto: ['', [
        Validators.required
      ]],
      convocatoria: ['', [
        Validators.required,
        Validators.maxLength(10)
      ]],
      inopia: [false],
      motivoInopia: ['', [
        Validators.maxLength(500)
      ]],
      numeroP9: ['', [
        Validators.required,
        Validators.pattern('(P9\\-[0-9]+)|(SHA\\-[0-9]+)'),
        Validators.maxLength(20)
      ]],
      archivoP9: [''],
      fechaInicio: ['', [
        Validators.required
      ]],
      fechaFinal: ['', [
        Validators.required
      ]],
      tramitado: [false],
      observaciones: ['', [
        Validators.maxLength(500)
      ]]
    });
  }

  get estudiante() {
    return this.formEstudiante.controls;
  }

  get fDesignacion() {
    return this.formDesignacion.controls;
  }

  private consultarEstudiantes() {
    this.designacionesService.consultarEstudiantes().subscribe(res => {
      this.listaEstudiantes = res;
    });
  }

  private buscarEstudiante(id: string, tipoId: string) {
    for (const estudiante of this.listaEstudiantes) {
      if (estudiante.identificacion === id && estudiante.tipoId === tipoId) {
        return estudiante;
      }
    }
    return null;
  }

  private consultarUsuarios() {
    this.usuariosService.consultar().subscribe(res => {
      this.listaUsuarios = res;
    });
  }

  private consultarUnidades() {
    this.unidadesService.consultar().subscribe(res => {
      this.listaUnidades = res;
    });
  }

  private consultarPresupuestos() {
    this.presupuestoService.consultar().subscribe(res => {
      this.listaPresupuesto = res;
    });
  }

  llenarDatosEstudiante(event: any) {
    if (this.formEstudiante.controls.tipoId.value !== '' && this.formEstudiante.controls.id.value.length >= 9) {
      const estudiante = this.buscarEstudiante(this.formEstudiante.controls.id.value, this.formEstudiante.controls.tipoId.value);
      if (estudiante != null) {
        this.formEstudiante.controls.nombre.setValue(estudiante.nombre);
        this.formEstudiante.controls.apellido1.setValue(estudiante.apellido1);
        this.formEstudiante.controls.apellido2.setValue(estudiante.apellido2);
        this.formEstudiante.controls.correo.setValue(estudiante.correo);
        this.formEstudiante.controls.celular.setValue(estudiante.celular);
        this.formEstudiante.controls.telefonoFijo.setValue(estudiante.telefonoFijo);
        this.formEstudiante.controls.carrera.setValue(estudiante.carrera);
        return;
      }
    }
    this.formEstudiante.controls.nombre.setValue('');
    this.formEstudiante.controls.apellido1.setValue('');
    this.formEstudiante.controls.apellido2.setValue('');
    this.formEstudiante.controls.correo.setValue('');
    this.formEstudiante.controls.celular.setValue('');
    this.formEstudiante.controls.telefonoFijo.setValue('');
    this.formEstudiante.controls.carrera.setValue('');
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formDesignacion.controls.archivoP9.setValue(file);
    }
  }

  limpiarMotivoInopia() {
    this.formDesignacion.controls.motivoInopia.setValue('');
  }

  aceptar() {
    if (this.formDesignacion.controls.archivoP9.value !== '') {
      const formData = new FormData();
      formData.append('archivo', this.formDesignacion.get('archivoP9').value);

      this.uploadService.subirArchivo(formData, 'regimen_becario').subscribe(
        (res) => {
          this.uploadResponse = res.url;
          this.uploadResponse = this.uploadResponse.substring(this.uploadResponse.indexOf('/uploads/'));
          this.crearDesignacion();
        },
        (err) => {
          this.uploadResponse = 'error';
          this.abrirDialogoError('Ha ocurrido un error subiendo el archivo');
        }
      );
    } else {
      this.uploadResponse = '';
      this.crearDesignacion();
    }
  }

  crearDesignacion() {
    const designacion = new P9Entidad();
    designacion.identificacion = this.formEstudiante.controls.id.value;
    designacion.tipoId = this.formEstudiante.controls.tipoId.value;
    designacion.nombre = this.formEstudiante.controls.nombre.value;
    designacion.apellido1 = this.formEstudiante.controls.apellido1.value;
    designacion.apellido2 = this.formEstudiante.controls.apellido2.value;
    designacion.correo = this.formEstudiante.controls.correo.value;
    designacion.celular = this.formEstudiante.controls.celular.value;
    designacion.telefonoFijo = this.formEstudiante.controls.telefonoFijo.value;
    designacion.carrera = this.formEstudiante.controls.carrera.value;

    designacion.anno = this.formDesignacion.controls.anno.value;
    designacion.ciclo = this.formDesignacion.controls.ciclo.value;
    designacion.fechaInicio = this.formDesignacion.controls.fechaInicio.value;
    designacion.fechaFinal = this.formDesignacion.controls.fechaFinal.value;
    designacion.convocatoria = this.formDesignacion.controls.convocatoria.value;
    designacion.horas = this.formDesignacion.controls.horas.value;
    designacion.modalidad = this.formDesignacion.controls.modalidad.value;
    designacion.inopia = this.formDesignacion.controls.inopia.value;
    designacion.motivoInopia = this.formDesignacion.controls.motivoInopia.value;
    designacion.tramitado = this.formDesignacion.controls.tramitado.value;
    designacion.observaciones = this.formDesignacion.controls.observaciones.value;
    designacion.presupuesto = this.formDesignacion.controls.presupuesto.value;
    designacion.responsable = this.formDesignacion.controls.responsable.value;
    designacion.unidad = this.formDesignacion.controls.unidad.value;
    designacion.adHonorem = this.formDesignacion.controls.adHonorem.value;

    designacion.numero = this.formDesignacion.controls.numeroP9.value;
    designacion.fecha = new Date();
    designacion.ubicacionArchivo = this.uploadResponse;
    this.designacionesService.agregarDesignacion(designacion).subscribe(res => {
      this.routeService.navigate(['/']);
    }, err => {
      this.abrirDialogoError('Error comunicandose con la base de datos');
    });
  }

  cancelar() {
    this.routeService.navigate(['/']);
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }
}
