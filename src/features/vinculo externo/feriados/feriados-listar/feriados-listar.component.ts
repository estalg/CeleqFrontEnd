import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {FeriadosEntidad} from '../../../../shared/entidades/vinculo externo/feriadosEntidad';
import {FeriadosService} from '../../../../shared/servicios/vinculo externo/feriados/feriados.service';

@Component({
  selector: 'app-feriados-listar',
  templateUrl: './feriados-listar.component.html',
  styleUrls: ['./feriados-listar.component.css']
})
export class FeriadosListarComponent implements OnInit {

  feriados: Array<FeriadosEntidad>;

  semanaSanta: Array<FeriadosEntidad>;

  public displayedColumns: string[] = ['descripcion', 'fecha', 'acciones'];

  public displayedColumnsSemanaSanta: string[] = ['descripcion', 'fechaInicio', 'fechaFinal', 'acciones'];

  public dataSource = new MatTableDataSource<FeriadosEntidad>();

  public semanaSantaSource = new MatTableDataSource<FeriadosEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private feriadosService: FeriadosService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarFeriados();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.consultarSemanaSanta();
  }

  private consultarFeriados = () => {
    this.feriadosService.consultar().subscribe(
      feriado => {
        this.dataSource.data = feriado as FeriadosEntidad[];
        this.feriados = this.dataSource.data;
      },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      }
    );
  }

  private consultarSemanaSanta = () => {
    this.feriadosService.consultarSemanaSanta().subscribe(
      feriado => {
        this.semanaSantaSource.data = feriado as FeriadosEntidad[];
        this.semanaSanta = this.semanaSantaSource.data;
      },
      error => {
        this.abrirDialogoError('Error al cargar Semana Santa');
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(id: number) {
    this.feriadosService.eliminar(id).subscribe(
      res => {
        this.consultarFeriados();
      },
      error => {
        this.abrirDialogoError('Error al eliminar feriado, inténtelo de nuevo');
      });
  }

  private abrirDialogoConfirmacion(id: number) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje: '¿Seguro que desea eliminar el feriado?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(id);
      }
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

}
