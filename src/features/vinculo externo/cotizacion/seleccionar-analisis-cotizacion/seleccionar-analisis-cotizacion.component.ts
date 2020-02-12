import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AnalisisEntidad} from '../../../../shared/entidades/vinculo externo/analisisEntidad';
import {AnalisisService} from '../../../../shared/servicios/vinculo externo/analisis/analisis.service';

export interface SeleccionarAnalisisDialog {
  tipoMuestra: string;
}

@Component({
  selector: 'app-seleccionar-analisis-cotizacion',
  templateUrl: './seleccionar-analisis-cotizacion.component.html',
  styleUrls: ['./seleccionar-analisis-cotizacion.component.css']
})
export class SeleccionarAnalisisCotizacionComponent implements OnInit {

  formSeleccionar: FormGroup;

  listaAnalisis: Array<AnalisisEntidad>;

  public dataSource = new MatTableDataSource<AnalisisEntidad>();

  public displayedColumns: string[] = ['descripcion', 'metodo', 'precio'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<SeleccionarAnalisisCotizacionComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: SeleccionarAnalisisDialog,
              private fb: FormBuilder,
              private analisisService: AnalisisService,
              public dialog: MatDialog,
              private routeService: Router) { }

  ngOnInit() {
    this.consultarAnalisis(this.datos.tipoMuestra);
  }

  private consultarAnalisis(tipoMuestra: string) {
    this.analisisService.filtrar_tipo(tipoMuestra).subscribe(
      analisis => {
        this.dataSource.data = analisis as AnalisisEntidad[];
        this.listaAnalisis = this.dataSource.data;
      },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      }
    );
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

  guardarAnalisis(analisis: AnalisisEntidad) {
    this.dialogRef.close(analisis);
  }

  cerrar() {
    this.dialogRef.close();
  }

}
