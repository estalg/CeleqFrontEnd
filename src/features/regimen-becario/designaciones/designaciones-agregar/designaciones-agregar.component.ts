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

  constructor(private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private designacionesService: DesignacionesService,
              private usuariosService: UsuariosService,
              private unidadesService: UnidadesService) { }

  ngOnInit() {
    this.consultarEstudiantes();
    this.consultarUsuarios();
    this.consultarUnidades();

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
        Validators.pattern('[0-9]*')
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
      inopia: [''],
      motivoInopia: ['', [
        Validators.maxLength(500)
      ]],
      numeroP9: ['', [
        Validators.required,
        Validators.pattern('(P9\\-[0-9]+)|(SHA\\-[0-9]+)')
      ]],
      fechaInicio: ['', [
        Validators.required
      ]],
      fechafinal: ['', [
        Validators.required
      ]],
      tramitado: [''],
      obervaciones: ['', [
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
      if (estudiante.id === id && estudiante.tipoId === tipoId) {
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
    this.unidadesService.consultar().subscribe(res =>{
      this.listaUnidades = res;
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
}
