import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {FeriadosEntidad} from '../../../../shared/entidades/vinculo externo/feriadosEntidad';
import {FeriadosService} from '../../../../shared/servicios/vinculo externo/feriados/feriados.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-feriados-agregar',
  templateUrl: './feriados-agregar.component.html',
  styleUrls: ['./feriados-agregar.component.css']
})
export class FeriadosAgregarComponent implements OnInit {

  formFeriados: FormGroup;

  // Nombre de la página
  titulo: string;

  // Feriado a editar/visualizar
  feriado: FeriadosEntidad;

  // Modo del form
  modoForm: string;

  private format = 'YYYY/MM/DD';

  constructor(private feriadosService: FeriadosService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this.route.snapshot.params.modo;
    this.feriado = new FeriadosEntidad();

    this.formFeriados = this.fb.group({
      descripcion: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      fecha: ['', [
        Validators.required
      ]],
      fecha1: ['', [
        Validators.required
      ]],
      fecha2: ['', [
        Validators.required
      ]]
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar Feriado';
      this.formFeriados.controls.fecha1.setValue(new Date());
      this.formFeriados.controls.fecha2.setValue(new Date());
    } else {
      if (this.modoForm === 'editar') {
        // tslint:disable-next-line:max-line-length
        this.feriadosService.consultarFeriado(this.route.snapshot.params.id).then(res => {
          this.feriado = res;
          this.formFeriados.controls.descripcion.setValue(this.feriado.descripcion);
          this.formFeriados.controls.fecha.setValue(this.feriado.fecha);

          if (this.modoForm === 'editar') {
            this.titulo = 'Editar Feriado';
            this.formFeriados.controls.fecha1.setValue(this.feriado.fecha);
            this.formFeriados.controls.fecha2.setValue(this.feriado.fecha);
          } else {
            this.titulo = 'Visualizar Feriado';
            this.formFeriados.disable();
          }
        });
      } else {
        // tslint:disable-next-line:max-line-length
        this.feriadosService.consultarSSid().then(res => {
          this.feriado = res;
          this.formFeriados.controls.descripcion.setValue(this.feriado.descripcion);
          this.formFeriados.controls.fecha1.setValue(this.feriado.fechaInicio);
          this.formFeriados.controls.fecha2.setValue(this.feriado.fechaFinal);

          if (this.modoForm === 'editarSS') {
            this.formFeriados.controls.fecha.setValue(this.feriado.fechaFinal);
            this.titulo = 'Editar Semana Santa';
            this.formFeriados.controls.descripcion.disable();
          } else {
            this.titulo = 'Visualizar Feriado';
            this.formFeriados.disable();
          }
        });
      }
    }
  }

  get descripcion() {
    return this.formFeriados.get('descripcion');
  }
  get fecha() {
    return this.formFeriados.get('fecha');
  }
  get fecha1() {
    return this.formFeriados.get('fecha1');
  }
  get fecha2() {
    return this.formFeriados.get('fecha2');
  }

  cancelar() {
    this.routeService.navigate(['/vinculo-externo/feriados']);
  }

  async agregar() {
    const feriadoNuevo = new FeriadosEntidad();
    feriadoNuevo.descripcion = this.formFeriados.controls.descripcion.value;
    feriadoNuevo.fecha = this.formFeriados.controls.fecha.value;

    this.feriadosService.agregar(feriadoNuevo).subscribe(result => {
        this.routeService.navigate(['/vinculo-externo/feriados']);
      },
      error => {
        this.abrirDialogoError('Error al agregar feriado, inténtelo de nuevo');
      });
  }

  async modificar() {
    const feriadoModificado = new FeriadosEntidad();
    if (this.modoForm === 'editar') {
      feriadoModificado.id = this.route.snapshot.params.id;
      feriadoModificado.descripcion = this.formFeriados.controls.descripcion.value;
      feriadoModificado.fecha = this.formFeriados.controls.fecha.value;

      this.feriadosService.modificar(feriadoModificado).subscribe(result => {
          this.routeService.navigate(['/vinculo-externo/feriados']);
        },
        error => {
          this.abrirDialogoError('Error al modificar feriado, inténtelo de nuevo');
        });
    } else {
      feriadoModificado.id = this.route.snapshot.params.id;
      feriadoModificado.descripcion = this.formFeriados.controls.descripcion.value;
      feriadoModificado.fechaInicio = this.formFeriados.controls.fecha1.value;
      feriadoModificado.fechaFinal = this.formFeriados.controls.fecha2.value;

      this.feriadosService.modificarSemanaSanta(feriadoModificado).subscribe(result => {
          this.routeService.navigate(['/vinculo-externo/feriados']);
        },
        error => {
          this.abrirDialogoError('Error al modificar feriado, inténtelo de nuevo');
        });
    }
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

}
