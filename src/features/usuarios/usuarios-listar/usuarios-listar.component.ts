import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioEntidad} from '../../../shared/entidades/usuarioEntidad';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UsuariosService} from '../../../shared/servicios/usuarios/usuarios.service';

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

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.consultarUsuarios();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarUsuarios = () => {
    this.usuariosService.consultar().subscribe(usuarios => {
      this.dataSource.data = usuarios as UsuarioEntidad[];
      this.usuarios = this.dataSource.data;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(cedula: string){
    this.usuariosService.eliminar(cedula).subscribe(res => {
      this.consultarUsuarios();
    });
  }

}
