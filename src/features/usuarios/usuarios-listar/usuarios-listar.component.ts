import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioEntidad} from '../../../shared/entidades/usuarioEntidad';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UsuariosService} from '../../../shared/servicios/usuarios/usuarios.service';

import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {AuthenticationService} from '../../../shared/servicios/seguridad/authentication.service';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css']
})
export class UsuariosListarComponent implements OnInit {
  usuarioSeleccionado: UsuarioEntidad;

  usuarios: Array<UsuarioEntidad>;

  public displayedColumns: string[] = ['cedula', 'correo', 'telefono', 'nombre', 'apellido1', 'apellido2', 'acciones'];

  public dataSource = new MatTableDataSource<UsuarioEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  permisos: string[];

  constructor(private usuariosService: UsuariosService,
              public dialog: MatDialog,
              private authServeice: AuthenticationService) { }

  ngOnInit() {
    this.permisos = this.authServeice.getPermisos();
    this.consultarUsuarios();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarUsuarios = () => {
    this.usuariosService.consultar().subscribe(
      usuarios => {
      this.dataSource.data = usuarios as UsuarioEntidad[];
      this.usuarios = this.dataSource.data;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(cedula: string) {
    this.usuariosService.eliminar(cedula).subscribe(
      res => {
      this.consultarUsuarios();
      this.abrirDialogoAfirmacion('Usuario eliminado correctamente');
    },
      error => {
        this.abrirDialogoError('Error al eliminar usuario, inténtelo de nuevo');
      });
  }

  private abrirDialogoConfirmacion(cedula: string) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje: '¿Seguro que desea eliminar el usuario?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(cedula);
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

  revisarPermiso(permiso: string) {
    return this.permisos.includes(permiso);
  }
}
