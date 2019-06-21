import {Component, OnInit, ViewChild} from '@angular/core';
import {SolicitudRegenciaEntidad} from '../../../../shared/entidades/regencia/solicitudRegenciaEntidad';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {SolicitudesRegenciaService} from '../../../../shared/servicios/regencia/solicitudes-regencia/solicitudes-regencia.service';

@Component({
  selector: 'app-solicitudes-regencia-listar',
  templateUrl: './solicitudes-regencia-listar.component.html',
  styleUrls: ['./solicitudes-regencia-listar.component.css']
})
export class SolicitudesRegenciaListarComponent implements OnInit {

  solicitudSeleccionada: SolicitudRegenciaEntidad;

  solicitudes: Array<SolicitudRegenciaEntidad>;

  // tslint:disable-next-line:max-line-length
  public displayedColumns: string[] = ['consecutivo', 'fechaSolicitud', 'nombreSolicitante', 'nombreEncargado', 'correoSolicitante', 'unidad', 'estado'];

  public dataSource = new MatTableDataSource<SolicitudRegenciaEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private SolicitudRegenciaService: SolicitudesRegenciaService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarSolicitudesRegencia();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarSolicitudesRegencia = () => {
    this.SolicitudRegenciaService.consultar().subscribe(solicitudes => {
      this.dataSource.data = solicitudes as SolicitudRegenciaEntidad[];
      this.solicitudes = this.dataSource.data;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
