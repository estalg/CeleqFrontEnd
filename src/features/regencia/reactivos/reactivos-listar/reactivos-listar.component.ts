import {Component, OnInit, ViewChild} from '@angular/core';
import {ReactivoEntidad} from '../../../../shared/entidades/regencia/reactivoEntidad';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReactivosService} from '../../../../shared/servicios/regencia/reactivos/reactivos.service';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-reactivos-listar',
  templateUrl: './reactivos-listar.component.html',
  styleUrls: ['./reactivos-listar.component.css']
})
export class ReactivosListarComponent implements OnInit {

  reactivoSeleccionado: ReactivoEntidad;

  reactivos: Array<ReactivoEntidad>;

  public displayedColumns: string[] = ['nombre', 'pureza', 'cantidad', 'estado', 'estante', 'acciones'];

  public dataSource = new MatTableDataSource<ReactivoEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private reactivosService: ReactivosService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarReactivos();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarReactivos = () => {
    this.reactivosService.consultar().subscribe(
      reactivos => {
      this.dataSource.data = reactivos as ReactivoEntidad[];
      this.reactivos = this.dataSource.data;
    },
      error => {
        this.abrirDialogoError('Error al cargar la lista');
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(nombre: string, pureza: string) {
    this.reactivosService.eliminar(nombre, pureza).subscribe(
      res => {
      this.consultarReactivos();
      this.abrirDialogoAfirmacion('Reactivo eliminado correctamente');
    },
      error => {
        this.abrirDialogoError('Error al eliminar reactivo');
      });
  }

  private abrirDialogoConfirmacion(nombre: string, pureza: string) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje: '¿Seguro que desea eliminar el reactivo?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(nombre, pureza);
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
