import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {precioGirasEntidad} from '../../../../shared/entidades/vinculo externo/precioGirasEntidad';
import {precioGirasService} from '../../../../shared/servicios/vinculo externo/precio giras/precioGiras.service';
import {Router} from '@angular/router';

export interface EditarPrecioDialog {
  variable: string;
  valor: number;
}

@Component({
  selector: 'app-precio-giras-editar',
  templateUrl: './precio-giras-editar.component.html',
  styleUrls: ['./precio-giras-editar.component.css']
})
export class PrecioGirasEditarComponent implements OnInit {

  fromprecioGiras: FormGroup;

  constructor(public dialogRef: MatDialogRef<PrecioGirasEditarComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: EditarPrecioDialog,
              private fb: FormBuilder,
              private PrecioGirasService: precioGirasService,
              public dialog: MatDialog,
              private routeService: Router) { }

  ngOnInit() {
    this.fromprecioGiras = this.fb.group({
      valor: ['', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]]
    });
    this.fromprecioGiras.controls.valor.setValue(this.datos.valor);
  }

  get valor() {
    return this.fromprecioGiras.get('valor');
  }

  async modificar() {
    const PrecioEditado = new precioGirasEntidad();
    PrecioEditado.valor = this.fromprecioGiras.controls.valor.value;
    PrecioEditado.variable = this.datos.variable;

    this.PrecioGirasService.modificar(PrecioEditado).subscribe(
      result => {
        this.cerrar();
      },
      error => {
        this.abrirDialogoError('Error al modificar precio para gira');
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
