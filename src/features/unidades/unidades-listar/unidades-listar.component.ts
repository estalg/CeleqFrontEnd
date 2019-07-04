import {Component, OnInit, ViewChild} from '@angular/core';
import {UnidadEntidad} from '../../../shared/entidades/unidad/unidadEntidad';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {UnidadesService} from '../../../shared/servicios/unidades/unidades.service';

@Component({
  selector: 'app-unidades-listar',
  templateUrl: './unidades-listar.component.html',
  styleUrls: ['./unidades-listar.component.css']
})
export class UnidadesListarComponent implements OnInit {

  unidadSeleccionada: UnidadEntidad;

  unidades: Array<UnidadEntidad>;

  public displayedColumns: string[] = ['nombre', 'encargado', 'acciones'];

  public dataSource = new MatTableDataSource<UnidadEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private unidadesService: UnidadesService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarUnidades();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarUnidades = () => {
    this.unidadesService.consultar().subscribe(
      unidades => {
        this.dataSource.data = unidades as UnidadEntidad[];
        this.unidades = this.dataSource.data;
      },
      error => {
        this.abrirDialogoError('Error al cargar la lista');
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

}
