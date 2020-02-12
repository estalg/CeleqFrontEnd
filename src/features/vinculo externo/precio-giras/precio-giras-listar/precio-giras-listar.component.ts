import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { precioGirasEntidad} from '../../../../shared/entidades/vinculo externo/precioGirasEntidad';
import { precioGirasService} from '../../../../shared/servicios/vinculo externo/precio giras/precioGiras.service';
import {PrecioGirasEditarComponent} from '../precio-giras-editar/precio-giras-editar.component';

@Component({
  selector: 'app-precio-giras-listar',
  templateUrl: './precio-giras-listar.component.html',
  styleUrls: ['./precio-giras-listar.component.css']
})
export class PrecioGirasListarComponent implements OnInit {

  precios: Array<precioGirasEntidad>;

  public dataSource = new MatTableDataSource<precioGirasEntidad>();

  public displayedColumns: string[] = ['variable', 'valor', 'acciones'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private precioGirasService: precioGirasService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarprecioGiras();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarprecioGiras = () => {
    this.precioGirasService.consultar().subscribe(
      precio => {
        this.dataSource.data = precio as precioGirasEntidad[];
        this.precios = this.dataSource.data;
      },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      }
    );
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

  private abrirDialogoEditar(variable: string, valor: number) {
    const dialogRef = this.dialog.open(PrecioGirasEditarComponent,
      {
        width: '350px',
        data: {variable, valor}
      });
    dialogRef.afterClosed().subscribe(result => {
      this.consultarprecioGiras();
    });
  }

}
