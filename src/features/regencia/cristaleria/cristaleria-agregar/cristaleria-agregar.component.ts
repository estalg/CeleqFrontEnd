import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CristaleriaEntidad} from '../../../../shared/entidades/regencia/cristaleriaEntidad';
import {ActivatedRoute, Router} from '@angular/router';
import {CristaleriaService} from '../../../../shared/servicios/regencia/cristaleria/cristaleria.service';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-cristaleria-agregar',
  templateUrl: './cristaleria-agregar.component.html',
  styleUrls: ['./cristaleria-agregar.component.css']
})
export class CristaleriaAgregarComponent implements OnInit {

  formCristaleria: FormGroup;

  // Nombre de la página
  titulo: string;

  // Usuario a editar/visualizar
  cristaleria: CristaleriaEntidad;

  // Modo del form
  modoForm: string;

  constructor(private cristaleriaService: CristaleriaService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.cristaleria = new CristaleriaEntidad();

    this.formCristaleria = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      material: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      capacidad: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      cantidad: ['', [
        Validators.required,
        Validators.pattern('[1-9]*')
      ]],
      caja: ['', [
        Validators.required,
        Validators.maxLength(5)
      ]]
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar Cristalería';
    } else {

      // tslint:disable-next-line:max-line-length
      this.cristaleriaService.consultarCristaleria(this.route.snapshot.params.nombre, this.route.snapshot.params.material, this.route.snapshot.params.capacidad).then(res => {
        this.cristaleria = res;
        this.formCristaleria.controls.nombre.setValue(this.cristaleria.nombre);
        this.formCristaleria.controls.material.setValue(this.cristaleria.material);
        this.formCristaleria.controls.capacidad.setValue(this.cristaleria.capacidad);
        this.formCristaleria.controls.cantidad.setValue(this.cristaleria.cantidad);
        this.formCristaleria.controls.caja.setValue(this.cristaleria.caja);
      });

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar Cristalería';
        this.formCristaleria.controls.nombre.disable();
        this.formCristaleria.controls.material.disable();
        this.formCristaleria.controls.capacidad.disable();
      } else {
        this.titulo = 'Visualizar Cristaleria';
        this.formCristaleria.disable();
      }
    }
  }

  get nombre() {
    return this.formCristaleria.get('nombre');
  }
  get material() {
    return this.formCristaleria.get('material');
  }
  get capacidad() {
    return this.formCristaleria.get('capacidad');
  }
  get cantidad() {
    return this.formCristaleria.get('cantidad');
  }
  get caja() {
    return this.formCristaleria.get('caja');
  }

  cancelar() {
    this.routeService.navigate(['/regencia/cristaleria']);
  }

  async agregar() {
    const cristaleriaNueva = new CristaleriaEntidad();
    cristaleriaNueva.nombre = this.formCristaleria.controls.nombre.value;
    cristaleriaNueva.material = this.formCristaleria.controls.material.value;
    cristaleriaNueva.capacidad = this.formCristaleria.controls.capacidad.value;
    cristaleriaNueva.cantidad = this.formCristaleria.controls.cantidad.value;
    cristaleriaNueva.caja = this.formCristaleria.controls.caja.value;

    this.cristaleriaService.agregar(cristaleriaNueva).subscribe(result => {
      this.routeService.navigate(['/regencia/cristaleria']);
      this.abrirDialogoAfirmacion('Cristalería agregada correctamente');
    },
      error => {
        this.abrirDialogoError('Error al agregar cristalería, inténtelo de nuevo');
      });
  }

  async modificar() {
    const cristaleriaModificada = new CristaleriaEntidad();
    cristaleriaModificada.nombre = this.formCristaleria.controls.nombre.value;
    cristaleriaModificada.material = this.formCristaleria.controls.material.value;
    cristaleriaModificada.capacidad = this.formCristaleria.controls.capacidad.value;
    cristaleriaModificada.cantidad = this.formCristaleria.controls.cantidad.value;
    cristaleriaModificada.caja = this.formCristaleria.controls.caja.value;

    this.cristaleriaService.modificar(cristaleriaModificada).subscribe(result => {
      this.routeService.navigate(['/regencia/cristaleria']);
      this.abrirDialogoAfirmacion('Cristalería modificada correctamente');
    },
      error => {
        this.abrirDialogoError('Error al modificar cristalería, inténtelo de nuevo');
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
