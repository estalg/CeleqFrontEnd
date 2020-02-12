import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {CotizacionEntidad} from '../../../../shared/entidades/vinculo externo/cotizacionEntidad';
import {CotizacionService} from '../../../../shared/servicios/vinculo externo/cotizacion/cotizacion.service';

@Component({
  selector: 'app-cotizacion-listar',
  templateUrl: './cotizacion-listar.component.html',
  styleUrls: ['./cotizacion-listar.component.css']
})
export class CotizacionListarComponent implements OnInit {

  cotizaciones: Array<CotizacionEntidad>;

  public displayedColumns: string[] = ['consecutivo', 'cliente', 'fechaCotizacion', 'acciones'];

  public dataSource = new MatTableDataSource<CotizacionEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cotizacionService: CotizacionService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarCotizaciones();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarCotizaciones = () => {
    this.cotizacionService.consultar().subscribe(
      cotizacion => {
        this.dataSource.data = cotizacion as CotizacionEntidad[];
        this.cotizaciones = this.dataSource.data;
      },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      }
    );
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
