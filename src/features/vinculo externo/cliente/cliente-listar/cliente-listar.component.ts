import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {ClienteEntidad} from '../../../../shared/entidades/vinculo externo/clienteEntidad';
import {ClienteService} from '../../../../shared/servicios/vinculo externo/cliente/cliente.service';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.css']
})
export class ClienteListarComponent implements OnInit {

  clientes: Array<ClienteEntidad>;

  public displayedColumns: string[] = ['nombre', 'telefono', 'telefono2', 'correo', 'fax', 'direccion', 'acciones'];

  public dataSource = new MatTableDataSource<ClienteEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private clienteService: ClienteService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarClientes();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarClientes = () => {
    this.clienteService.consultar().subscribe(
      cliente => {
        this.dataSource.data = cliente as ClienteEntidad[];
        this.clientes = this.dataSource.data;
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
