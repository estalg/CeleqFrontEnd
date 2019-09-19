import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
import {P9Entidad} from '../../../../shared/entidades/regimen becario/p9Entidad';
import {UploadService} from '../../../../shared/servicios/upload/upload.service';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {FileService} from '../../../../shared/servicios/archivos/file.service';

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
  private designacion: P9Entidad;

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

  private nombreArchivo: string;

  private cambiandoArchivo: boolean;

  private p9Anterior: string;

  constructor(private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private designacionesService: DesignacionesService,
              private usuariosService: UsuariosService,
              private unidadesService: UnidadesService,
              private presupuestoService: PresupuestosService,
              private uploadService: UploadService,
              private fileService: FileService) { }

  ngOnInit() {
    this.cambiandoArchivo = false;
    this.consultarEstudiantes();
    this.consultarUsuarios();
    this.consultarUnidades();
    this.consultarPresupuestos();

    this.modoForm = this.route.snapshot.params.modo;
    this.designacion = new P9Entidad();

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

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar designación';
    } else if (this.modoForm === 'editar') {
      this.titulo = 'Editar designacion';
      this.formEstudiante.disable();
      this.formDesignacion.get('ciclo').disable();
      this.formDesignacion.get('anno').disable();
      this.formDesignacion.get('modalidad').disable();
      this.formDesignacion.get('adHonorem').disable();
      this.formDesignacion.get('presupuesto').disable();
      this.formDesignacion.get('convocatoria').disable();
      this.formDesignacion.get('inopia').disable();
      this.formDesignacion.get('motivoInopia').disable();
      // this.formDesignacion.get('numeroP9').disable();
      this.formDesignacion.get('fechaInicio').disable();

      this.designacionesService.consultarDesignacion(this.route.snapshot.params.id, this.route.snapshot.params.anno).subscribe(res => {
        this.designacion = res;

        this.formEstudiante.get('id').setValue(res.identificacion);
        this.formEstudiante.get('tipoId').setValue(res.tipoId        );
        this.formEstudiante.get('nombre').setValue(res.nombre        );
        this.formEstudiante.get('apellido1').setValue(res.apellido1     );
        this.formEstudiante.get('apellido2').setValue(res.apellido2     );
        this.formEstudiante.get('carrera').setValue(res.carrera       );
        this.formEstudiante.get('correo').setValue(res.correo        );
        this.formEstudiante.get('celular').setValue(res.celular       );
        this.formEstudiante.get('telefonoFijo').setValue(res.telefonoFijo  );

        this.formDesignacion.get('anno').setValue(res.anno         );
        this.formDesignacion.get('ciclo').setValue(res.ciclo        );
        this.formDesignacion.get('fechaInicio').setValue(res.fechaInicio  );
        this.formDesignacion.get('fechaFinal').setValue(res.fechaFinal   );
        this.formDesignacion.get('convocatoria').setValue(res.convocatoria );
        this.formDesignacion.get('horas').setValue(res.horas        );
        this.formDesignacion.get('modalidad').setValue(res.modalidad    );
        this.formDesignacion.get('inopia').setValue(res.inopia       );
        this.formDesignacion.get('motivoInopia').setValue(res.motivoInopia );
        this.formDesignacion.get('tramitado').setValue(res.tramitado    );
        this.formDesignacion.get('observaciones').setValue(res.observaciones);
        this.formDesignacion.get('presupuesto').setValue(res.presupuesto  );
        this.formDesignacion.get('responsable').setValue(res.responsable  );
        this.formDesignacion.get('unidad').setValue(res.unidad       );
        this.formDesignacion.get('adHonorem').setValue(res.adHonorem    );
        this.formDesignacion.get('numeroP9').setValue(res.numero       );
        this.p9Anterior = res.numero;

        if (this.designacion.ubicacionArchivo !== '') {
          this.nombreArchivo = this.designacion.ubicacionArchivo.substring(this.designacion.ubicacionArchivo.indexOf('-') + 1);
        }
      });
    }
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

  modificar() {
    if (this.formDesignacion.controls.archivoP9.value !== '' && this.cambiandoArchivo) {
      const formData = new FormData();
      formData.append('archivo', this.formDesignacion.get('archivoP9').value);

      this.uploadService.subirArchivo(formData, 'regimen_becario').subscribe(
        (res) => {
          this.uploadResponse = res.url;
          this.uploadResponse = this.uploadResponse.substring(this.uploadResponse.indexOf('/uploads/'));
          this.modificarDesignacion();
        },
        (err) => {
          this.uploadResponse = 'error';
          this.abrirDialogoError('Ha ocurrido un error subiendo el archivo');
        }
      );
    } else {
      this.uploadResponse = '';
      this.modificarDesignacion();
    }
  }

  modificarDesignacion() {
    const designacionModificada = new P9Entidad();
    designacionModificada.id = this.route.snapshot.params.id;
    designacionModificada.anno = this.route.snapshot.params.anno;
    designacionModificada.responsable = this.formDesignacion.controls.responsable.value;
    designacionModificada.unidad = this.formDesignacion.controls.unidad.value;
    designacionModificada.horas = this.formDesignacion.controls.horas.value;
    designacionModificada.observaciones = this.formDesignacion.controls.observaciones.value;
    designacionModificada.tramitado = this.formDesignacion.controls.tramitado.value;
    designacionModificada.fechaFinal = this.formDesignacion.controls.fechaFinal.value;
    designacionModificada.numero = this.formDesignacion.controls.numeroP9.value;
    designacionModificada.ubicacionArchivo = this.uploadResponse;
    designacionModificada.fecha = new Date();
    console.log(designacionModificada);
    this.designacionesService.editarDesignacion(designacionModificada).subscribe(result => {
        this.abrirDialogoAfirmacion('Designación modificada correctamente');
      },
      error => {
        this.abrirDialogoError('Error al modificar designación, inténtelo de nuevo');
      });
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

  private abrirDialogoAfirmacion(mensaje: string) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'afirmacion'}
      });
  }

  private descargar() {
    this.fileService.downloadFile(this.designacion.ubicacionArchivo).subscribe(res => {
      const dataType = res.type;
      const binaryData = [];
      binaryData.push(res);
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      const filename = this.nombreArchivo;
      downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, error => {
      this.abrirDialogoError('Ha ocurrido un error descargando el archivo.');
    });
  }

  private resetearP9() {
    if (this.modoForm === 'editar') {
      this.formDesignacion.get('archivoP9').setValue('');
      this.nombreArchivo = '';
      this.cambiandoArchivo = true;
    }
  }
}
