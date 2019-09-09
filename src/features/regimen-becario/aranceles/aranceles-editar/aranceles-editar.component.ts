import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArancelEntidad} from '../../../../shared/entidades/regimen becario/arancelEntidad';
import {ArancelesService} from '../../../../shared/servicios/regimen becario/aranceles/aranceles.service';
import {Router} from '@angular/router';

export interface EditarArancelDialog {
  tipo: string;
  monto: number;
}

@Component({
  selector: 'app-aranceles-editar',
  templateUrl: './aranceles-editar.component.html',
  styleUrls: ['./aranceles-editar.component.css']
})
export class ArancelesEditarComponent implements OnInit {

  private fromAranceles: FormGroup;

  constructor(public dialogRef: MatDialogRef<ArancelesEditarComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: EditarArancelDialog,
              private fb: FormBuilder,
              private arancelesService: ArancelesService,
              public dialog: MatDialog,
              private routeService: Router) { }

  ngOnInit() {
    this.fromAranceles = this.fb.group({
      monto: ['', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]]
    });
    this.fromAranceles.controls.monto.setValue(this.datos.monto);
  }

  get monto() {
    return this.fromAranceles.get('monto');
  }

  async modificar() {
    const ArancelEditado = new ArancelEntidad();
    ArancelEditado.monto = this.fromAranceles.controls.monto.value;
    ArancelEditado.tipo = this.datos.tipo;

    this.arancelesService.modificar(ArancelEditado).subscribe(
      result => {
        this.cerrar();
      },
      error => {
        this.abrirDialogoError('Error al modificar arancel');
        this.cerrar();
      });
  }

  cerrar() {
    this.dialogRef.close();
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

}
