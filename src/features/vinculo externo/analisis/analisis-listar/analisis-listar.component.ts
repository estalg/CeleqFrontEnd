import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {AnalisisEntidad} from '../../../../shared/entidades/vinculo externo/analisisEntidad';
import {AnalisisService} from '../../../../shared/servicios/vinculo externo/analisis/analisis.service';
import {PrecioGirasEditarComponent} from '../../precio-giras/precio-giras-editar/precio-giras-editar.component';
import {TipoMuestraAgregarComponent} from '../tipo-muestra-agregar/tipo-muestra-agregar.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-analisis-listar',
  templateUrl: './analisis-listar.component.html',
  styleUrls: ['./analisis-listar.component.css']
})
export class AnalisisListarComponent implements OnInit {

  analisis: Array<AnalisisEntidad>;
  tipoMuestras: Array<AnalisisEntidad>;

  formAnalisis: FormGroup;

  listaTipoMuestras: AnalisisEntidad[];

  public displayedColumns: string[] = ['descripcion', 'tipoMuestra', 'metodo', 'precio', 'acreditacion', 'acciones'];

  public dataSource = new MatTableDataSource<AnalisisEntidad>();
  public dataSourceTipo = new MatTableDataSource<AnalisisEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private analisisService: AnalisisService,
              public dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.formAnalisis = this.fb.group({
      tipoMuestra: ['', [
      ]]
    });
    this.consultarTipos();
    this.consultarAnalisis();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarAnalisis = () => {
    this.analisisService.consultar().subscribe(
      analisis => {
        this.dataSource.data = analisis as AnalisisEntidad[];
        this.analisis = this.dataSource.data;
      },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      }
    );
  }

  private consultarTipos() {
    this.analisisService.consultar_tipoMuestra().subscribe(res => {
      this.listaTipoMuestras = res;
    });
  }

  private eliminar_tipoMuestra(tipo: string) {
    if (tipo !== '') {
      this.analisisService.eliminar_tipoMuestra(tipo).subscribe(
        res => {
          this.consultarTipos();
        },
        error => {
          this.abrirDialogoError('Error al eliminar tipo de muestra, inténtelo de nuevo');
        });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(descripcion: string, tipoMuestra: string) {
    this.analisisService.eliminar(descripcion, tipoMuestra).subscribe(
      res => {
        this.consultarAnalisis();
      },
      error => {
        this.abrirDialogoError('Error al eliminar análisis, inténtelo de nuevo');
      });
  }

  private abrirDialogoConfirmacion(descripcion: string, tipoMuestra: string) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje: '¿Seguro que desea eliminar el análisis?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(descripcion, tipoMuestra);
      }
    });
  }

  private filtarDatos(filtro: string) {
    this.analisisService.filtrar_tipo(filtro).subscribe(analisis => {
      this.dataSource.data = analisis as AnalisisEntidad[];
      this.analisis = this.dataSource.data;
    });
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

  private abrirDialogoAgregar() {
    const dialogRef = this.dialog.open(TipoMuestraAgregarComponent,
      {
        width: '350px'
      });
    dialogRef.afterClosed().subscribe(result => {
      this.consultarTipos();
    });
  }

}
