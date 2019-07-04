import {Component, OnInit, ViewChild} from '@angular/core';
import {GrupoEntidad} from '../../../shared/entidades/grupoEntidad';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UsuarioEntidad} from '../../../shared/entidades/usuarioEntidad';
import {GruposService} from '../../../shared/servicios/grupos/grupos.service';
import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-grupos-listar',
  templateUrl: './grupos-listar.component.html',
  styleUrls: ['./grupos-listar.component.css']
})
export class GruposListarComponent implements OnInit {

  grupoSeleccionado: GrupoEntidad;
  grupos: Array<GrupoEntidad>;

  public displayedColumns: string[] = ['descripcion', 'acciones'];

  public dataSource = new MatTableDataSource<GrupoEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private gruposService: GruposService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarGrupos();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarGrupos = () => {
    this.gruposService.consultar().subscribe(grupos => {
      this.dataSource.data = grupos as GrupoEntidad[];
      this.grupos = this.dataSource.data;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(cedula: string) {
    this.gruposService.eliminar(cedula).subscribe(res => {
      this.consultarGrupos();
    });
  }

  private abrirDialogoConfirmacion(descripcion: string) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje: '¿Seguro que desea eliminar este grupo?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(descripcion);
      }
    });
  }

}
