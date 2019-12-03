import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog} from '@angular/material';
import {PresupuestoEntidad} from '../../../../shared/entidades/regimen becario/PresupuestoEntidad';
import {PresupuestosService} from '../../../../shared/servicios/regimen becario/presupuestos/presupuestos.service';

@Component({
  selector: 'app-presupuesto-agregar',
  templateUrl: './presupuesto-agregar.component.html',
  styleUrls: ['./presupuesto-agregar.component.css']
})
export class PresupuestoAgregarComponent implements OnInit {

  formPresupuesto: FormGroup;

  // Nombre de la página
  titulo: string;

  // Presupuesto a editar/visualizar
  private presupuesto: PresupuestoEntidad;

  // Modo del form
  modoForm: string;

  constructor(private presupuestoService: PresupuestosService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.presupuesto = new PresupuestoEntidad();

    this.formPresupuesto = this.fb.group({
      codigo: ['', [
        Validators.required,
        Validators.maxLength(12)
      ]],
      nombre: ['', [
        Validators.required,
        Validators.maxLength(560)
      ]]
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar Presupuesto';
    } else {

      this.presupuestoService.consultarPresupuesto(this.route.snapshot.params.codigo).then(res => {
        this.presupuesto = res;
        this.formPresupuesto.controls.codigo.setValue(this.presupuesto.codigo);
        this.formPresupuesto.controls.nombre.setValue(this.presupuesto.nombre);
      });

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar Presupuesto';
        this.formPresupuesto.controls.codigo.disable();
      }
    }
  }

  get codigo() {
    return this.formPresupuesto.get('codigo');
  }

  get nombre() {
    return this.formPresupuesto.get('nombre');
  }

  async agregar() {
    const presupuestoNuevo = new PresupuestoEntidad();
    presupuestoNuevo.codigo = this.formPresupuesto.controls.codigo.value;
    presupuestoNuevo.nombre = this.formPresupuesto.controls.nombre.value;

    this.presupuestoService.agregar(presupuestoNuevo).subscribe(
      result => {
        this.routeService.navigate(['/regimen-becario/presupuestos']);
        this.abrirDialogoAfirmacion('Presupuesto agregado correctamente');
      },
      error => {
        this.abrirDialogoError('Error al agregar presupuesto');
      });
  }

  async modificar() {
    const presupuestoModificado = new PresupuestoEntidad();
    presupuestoModificado.codigo = this.formPresupuesto.controls.codigo.value;
    presupuestoModificado.nombre = this.formPresupuesto.controls.nombre.value;

    this.presupuestoService.modificar(presupuestoModificado).subscribe(
      result => {
        this.routeService.navigate(['/regimen-becario/presupuestos']);
        this.abrirDialogoAfirmacion('Presupuesto modificado correctamente');
      },
      error => {
        this.abrirDialogoError('Error al modificar presupuesto');
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

  cancelar() {
    this.routeService.navigate(['/regimen-becario/presupuestos']);
  }

}
