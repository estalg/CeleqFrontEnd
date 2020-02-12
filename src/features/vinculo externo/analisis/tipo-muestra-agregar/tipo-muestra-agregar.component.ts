import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AnalisisEntidad} from '../../../../shared/entidades/vinculo externo/analisisEntidad';
import {AnalisisService} from '../../../../shared/servicios/vinculo externo/analisis/analisis.service';

export interface AgregarTipoMuestraDialog {
  tipo: string;
}

@Component({
  selector: 'app-tipo-muestra-agregar',
  templateUrl: './tipo-muestra-agregar.component.html',
  styleUrls: ['./tipo-muestra-agregar.component.css']
})
export class TipoMuestraAgregarComponent implements OnInit {

  fromTipoMuestras: FormGroup;

  constructor(public dialogRef: MatDialogRef<TipoMuestraAgregarComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: AgregarTipoMuestraDialog,
              private fb: FormBuilder,
              private analisisService: AnalisisService,
              public dialog: MatDialog,
              private routeService: Router) { }

  ngOnInit() {
    this.fromTipoMuestras = this.fb.group({
      tipo: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]]
    });
    this.fromTipoMuestras.controls.tipo.setValue(this.datos.tipo);
  }

  get tipo() {
    return this.fromTipoMuestras.get('tipo');
  }

  async agregar() {
    const tipoNuevo = new AnalisisEntidad();
    tipoNuevo.tipo = this.fromTipoMuestras.controls.tipo.value;
    console.log(this.fromTipoMuestras.controls.tipo.value);

    this.analisisService.agregar_tipoMuestra(tipoNuevo).subscribe(
      result => {
        this.cerrar();
      },
      error => {
        this.abrirDialogoError('Error al agregar tipo de muestra');
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
