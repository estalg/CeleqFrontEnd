import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {LocalizacionEntidad} from '../../../../shared/entidades/vinculo externo/localizacionEntidad';
import {LocalizacionesService} from '../../../../shared/servicios/vinculo externo/localizaciones/localizaciones.service';

@Component({
  selector: 'app-localizaciones-listar',
  templateUrl: './localizaciones-listar.component.html',
  styleUrls: ['./localizaciones-listar.component.css']
})
export class LocalizacionesListarComponent implements OnInit {

  localizacionSeleccionada: LocalizacionEntidad;

  localizaciones: Array<LocalizacionEntidad>;

  public displayedColumns: string[] = ['provincia', 'canton', 'localidad', 'distancia', 'hospedaje', 'acciones'];

  public dataSource = new MatTableDataSource<LocalizacionEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private localizacionesService: LocalizacionesService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarLocalizaciones();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarLocalizaciones = () => {
    this.localizacionesService.consultar().subscribe(
      localizacion => {
        this.dataSource.data = localizacion as LocalizacionEntidad[];
        this.localizaciones = this.dataSource.data;
      },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(provincia: string, canton: string, localidad: string) {
    this.localizacionesService.eliminar(provincia, canton, localidad).subscribe(
      res => {
        this.consultarLocalizaciones();
      },
      error => {
        this.abrirDialogoError('Error al eliminar localización, inténtelo de nuevo');
      });
  }

  private abrirDialogoConfirmacion(provincia: string, canton: string, localidad: string) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje: '¿Seguro que desea eliminar la localización?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(provincia, canton, localidad);
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

}
