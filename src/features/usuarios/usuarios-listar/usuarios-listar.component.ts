import {Component, OnInit, ViewChild} from '@angular/core';
import {UsuarioEntidad} from '../../../shared/entidades/usuarioEntidad';
import {MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css']
})
export class UsuariosListarComponent implements OnInit {

  usuarios: Array<UsuarioEntidad>;

  public displayedColumns: string[] = ['cedula', 'correo', 'telefono', 'nombre', 'apellido1', 'apellido2', 'acciones'];

  public dataSource = new MatTableDataSource<UsuarioEntidad>();

  @ViewChild(MatSort, {read: true, static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {read: true, static: false}) paginator: MatPaginator;

  dialogConfig: MatDialogConfig;
  constructor() { }

  ngOnInit() {
  }

}
