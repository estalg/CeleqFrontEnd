import {Component, OnInit, ViewChild} from '@angular/core';
import {SolicitudRegenciaEntidad} from '../../../../shared/entidades/regencia/solicitudRegenciaEntidad';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {SolicitudesRegenciaService} from '../../../../shared/servicios/regencia/solicitudes-regencia/solicitudes-regencia.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from '../../../../shared/servicios/seguridad/authentication.service';

@Component({
  selector: 'app-solicitudes-regencia-listar',
  templateUrl: './solicitudes-regencia-listar.component.html',
  styleUrls: ['./solicitudes-regencia-listar.component.css']
})
export class SolicitudesRegenciaListarComponent implements OnInit {

  solicitudSeleccionada: SolicitudRegenciaEntidad;

  solicitudes: Array<SolicitudRegenciaEntidad>;

  // Modo del form
  private modoForm: string;

  // Nombre de la página
  titulo: string;

  // tslint:disable-next-line:max-line-length
  public displayedColumns: string[] = ['consecutivo', 'fechaSolicitud', 'nombreSolicitante', 'nombreEncargado', 'correoSolicitante', 'unidad', 'estado', 'acciones'];

  public dataSource = new MatTableDataSource<SolicitudRegenciaEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private SolicitudRegenciaService: SolicitudesRegenciaService,
              public dialog: MatDialog,
              private _routeService: Router,
              private _route: ActivatedRoute,
              private authServeice: AuthenticationService) { }

  ngOnInit() {
    this.modoForm = this._route.snapshot.params.modo;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.modoForm === 'historico') {
      this.titulo = 'Histórico de Solicitudes';
      this.consultarSolicitudesRegencia();
    } else if (this.modoForm === 'pendientes') {
      this.titulo = 'Solicitudes Pendientes';
      this.consultarSolicitudesRegenciaPendientes();
    } else if (this.modoForm === 'usuario') {
      this.titulo = 'Solicitudes Usuario';
      this.consultarSolicitudesRegenciaUsuario();
    }
  }

  private consultarSolicitudesRegencia = () => {
    this.SolicitudRegenciaService.consultar().subscribe(solicitudes => {
      this.dataSource.data = solicitudes as SolicitudRegenciaEntidad[];
      this.solicitudes = this.dataSource.data;
    },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      });
  }

  private consultarSolicitudesRegenciaPendientes = () => {
    this.SolicitudRegenciaService.consultarPendientes().subscribe(solicitudes => {
      this.dataSource.data = solicitudes as SolicitudRegenciaEntidad[];
      this.solicitudes = this.dataSource.data;
      this.displayedColumns = ['consecutivo', 'fechaSolicitud', 'nombreSolicitante', 'nombreEncargado', 'correoSolicitante', 'unidad', 'acciones'];
    },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      });
  }

  private consultarSolicitudesRegenciaUsuario = () => {
    this.SolicitudRegenciaService.consultarSolicitudesUsuario(this.authServeice.getCedula()).subscribe(solicitudes => {
      this.dataSource.data = solicitudes as SolicitudRegenciaEntidad[];
      this.solicitudes = this.dataSource.data;
    },
      error => {
        this.abrirDialogoError('Error al cargar lista');
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
