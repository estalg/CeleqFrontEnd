import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CristaleriaEntidad} from '../../../../shared/entidades/regencia/cristaleriaEntidad';
import {CristaleriaService} from '../../../../shared/servicios/regencia/cristaleria/cristaleria.service';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-cristaleria-listar',
  templateUrl: './cristaleria-listar.component.html',
  styleUrls: ['./cristaleria-listar.component.css']
})
export class CristaleriaListarComponent implements OnInit {

  cristaleriaSeleccionada: CristaleriaEntidad;

  cristalerias: Array<CristaleriaEntidad>;

  public displayedColumns: string[] = ['nombre', 'material', 'capacidad', 'caja', 'acciones'];

  public dataSource = new MatTableDataSource<CristaleriaEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cristaleriaService: CristaleriaService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarCristaleria();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarCristaleria = () => {
    this.cristaleriaService.consultar().subscribe(
      cristaleria => {
      this.dataSource.data = cristaleria as CristaleriaEntidad[];
      this.cristalerias = this.dataSource.data;
    },
        error => {
        this.abrirDialogoError('Error al cargar lista, recargue la página nuevamente');
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(nombre: string, material: string, capacidad: string) {
    this.cristaleriaService.eliminar(nombre, material, capacidad).subscribe(
      res => {
      this.consultarCristaleria();
      this.abrirDialogoAfirmacion('Cristalería eliminada correctamente');
    },
      error => {
        this.abrirDialogoError('Error al eliminar cristalería, inténtelo de nuevo');
      });
  }

  private abrirDialogoConfirmacion(nombre: string, material: string, capacidad: string) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje: '¿Seguro que desea eliminar la cristalería?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(nombre, material, capacidad);
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
}
