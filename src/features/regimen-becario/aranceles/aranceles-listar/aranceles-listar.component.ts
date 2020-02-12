import {Component, OnInit, ViewChild} from '@angular/core';
import {ArancelEntidad} from '../../../../shared/entidades/regimen becario/arancelEntidad';
import {ArancelesService} from '../../../../shared/servicios/regimen becario/aranceles/aranceles.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {ArancelesEditarComponent} from '../aranceles-editar/aranceles-editar.component';

@Component({
  selector: 'app-aranceles-listar',
  templateUrl: './aranceles-listar.component.html',
  styleUrls: ['./aranceles-listar.component.css']
})
export class ArancelesListarComponent implements OnInit {

  aranceles: Array<ArancelEntidad>;

  public dataSource = new MatTableDataSource<ArancelEntidad>();

  public displayedColumns: string[] = ['tipo', 'monto', 'acciones'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private arancelesService: ArancelesService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarAranceles();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarAranceles = () => {
    this.arancelesService.consultar().subscribe(
      arancel => {
        this.dataSource.data = arancel as ArancelEntidad[];
        this.aranceles = this.dataSource.data;
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

  private abrirDialogoEditar(tipo: string, monto: number) {
    const dialogRef = this.dialog.open(ArancelesEditarComponent,
      {
        width: '350px',
        data: {tipo, monto}
      });
    dialogRef.afterClosed().subscribe(result => {
      this.consultarAranceles();
    });
  }

}
