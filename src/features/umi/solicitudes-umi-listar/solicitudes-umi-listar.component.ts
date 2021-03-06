import {Component, OnInit, ViewChild} from '@angular/core';
import { SolicitudUmiEntidad} from '../../../shared/entidades/umi/solicitudUmiEntidad';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../../../shared/servicios/seguridad/authentication.service';
import {UmiService} from '../../../shared/servicios/umi/umi.service';
import {SolicitudRegenciaEntidad} from '../../../shared/entidades/regencia/solicitudRegenciaEntidad';

@Component({
  selector: 'app-solicitudes-umi-listar',
  templateUrl: './solicitudes-umi-listar.component.html',
  styleUrls: ['./solicitudes-umi-listar.component.css']
})
export class SolicitudesUmiListarComponent implements OnInit {

  solicitudSeleccionada: SolicitudUmiEntidad;

  solicitudes: Array<SolicitudUmiEntidad>;

  // Modo del form
  private modoForm: string;

  // Nombre de la página
  titulo: string;

  // tslint:disable-next-line:max-line-length
  public displayedColumns: string[] = ['consecutivo', 'nombreSolicitante', 'urgencia', 'areaTrabajo',
    'lugarTrabajo', 'descripcionTrabajo', 'estado', 'acciones'];

  public dataSource = new MatTableDataSource<SolicitudUmiEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private SolicitudRegenciaService: UmiService,
              public dialog: MatDialog,
              private _routeService: Router,
              private _route: ActivatedRoute,
              private authService: AuthenticationService) { }

  ngOnInit() {
    this.modoForm = this._route.snapshot.params.modo;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.modoForm === 'historico') {
      this.titulo = 'Histórico de Solicitudes';
      this.consultarSolicitudesMantenimiento();
    } else if (this.modoForm === 'pendientes') {
      this.titulo = 'Solicitudes Pendientes';
      this.consultarSolicitudesMantenimientoPendientes();
    } else if (this.modoForm === 'aprobadas') {
      this.titulo = 'Solicitudes Aprobadas';
      this.consultarSolicitudesMantenimientoAprobadas();
    } else if (this.modoForm === 'analizadas') {
      this.titulo = 'Solicitudes Analizadas';
      this.consultarSolicitudesMantenimientoAnalizadas();
    }
  }

  private consultarSolicitudesMantenimiento = () => {
    this.SolicitudRegenciaService.consultar().subscribe(solicitudes => {
      this.dataSource.data = solicitudes as SolicitudUmiEntidad[];
      this.solicitudes = this.dataSource.data;
    },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      });
  }

  private consultarSolicitudesMantenimientoPendientes = () => {
    this.SolicitudRegenciaService.consultarPendientes().subscribe(solicitudes => {
      this.dataSource.data = solicitudes as SolicitudUmiEntidad[];
      this.solicitudes = this.dataSource.data;
      // tslint:disable-next-line:max-line-length
      this.displayedColumns = ['consecutivo', 'nombreSolicitante', 'urgencia', 'areaTrabajo',
      'lugarTrabajo', 'descripcionTrabajo', 'acciones'];
    },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      });
  }

  private consultarSolicitudesMantenimientoAnalizadas = () => {
    this.SolicitudRegenciaService.consultarAnalizadas(this.authService.getCedula()).subscribe(solicitudes => {
      this.dataSource.data = solicitudes as SolicitudUmiEntidad[];
      this.solicitudes = this.dataSource.data;
        // tslint:disable-next-line:max-line-length
      this.displayedColumns = ['consecutivo', 'nombreSolicitante', 'urgencia', 'areaTrabajo',
          'lugarTrabajo', 'descripcionTrabajo', 'nombrePersonaAsignada', 'acciones'];
    },
    error => {
      this.abrirDialogoError('Error al cargar lista');
    });
  }

  private consultarSolicitudesMantenimientoAprobadas = () => {
    this.SolicitudRegenciaService.consultarAprobadas(this.authService.getCedula()).subscribe(solicitudes => {
      this.dataSource.data = solicitudes as SolicitudUmiEntidad[];
      this.solicitudes = this.dataSource.data;
      // tslint:disable-next-line:max-line-length
      this.displayedColumns = ['consecutivo', 'nombreSolicitante', 'urgencia', 'areaTrabajo',
        'lugarTrabajo', 'descripcionTrabajo', 'nombrePersonaAsignada', 'acciones'];
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
