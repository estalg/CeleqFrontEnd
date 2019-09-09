import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PresupuestoEntidad} from '../../../../shared/entidades/regimen becario/PresupuestoEntidad';
import {PresupuestosService} from '../../../../shared/servicios/regimen becario/presupuestos/presupuestos.service';

@Component({
  selector: 'app-presupuesto-consultar',
  templateUrl: './presupuesto-consultar.component.html',
  styleUrls: ['./presupuesto-consultar.component.css']
})
export class PresupuestoConsultarComponent implements OnInit {

  private formPresupuesto: FormGroup;

  presupuestos: Array<PresupuestoEntidad>;

  public displayedColumns: string[] = ['codigo', 'nombre', 'acciones'];

  public dataSource = new MatTableDataSource<PresupuestoEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private presupuestoService: PresupuestosService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarPresupuestos();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private consultarPresupuestos = () => {
    this.presupuestoService.consultar().subscribe(
      presupuesto => {
        this.dataSource.data = presupuesto as PresupuestoEntidad[];
        this.presupuestos = this.dataSource.data;
      },
      error => {
        this.abrirDialogoError('Error al cargar lista');
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private eliminar(codigo: string) {
    this.presupuestoService.eliminar(codigo).subscribe(
      res => {
        this.consultarPresupuestos();
        this.abrirDialogoAfirmacion('Presupuesto eliminado correctamente');
      },
      error => {
        this.abrirDialogoError('Error al eliminar presupuesto, inténtelo de nuevo');
      });
  }

  private abrirDialogoConfirmacion(codigo: string) {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje: '¿Seguro que desea eliminar la cristalería?', tipoMensaje: 'confirmacion'}
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(codigo);
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
