import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SolicitudRegenciaEntidad} from '../../../../shared/entidades/regencia/solicitudRegenciaEntidad';
import {ActivatedRoute, Router} from '@angular/router';
import {SolicitudesRegenciaService} from '../../../../shared/servicios/regencia/solicitudes-regencia/solicitudes-regencia.service';
import {ReactivosService} from '../../../../shared/servicios/regencia/reactivos/reactivos.service';
import {CristaleriaService} from '../../../../shared/servicios/regencia/cristaleria/cristaleria.service';
import {UsuarioEntidad} from '../../../../shared/entidades/usuarioEntidad';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ReactivoEntidad} from '../../../../shared/entidades/regencia/reactivoEntidad';
import {CristaleriaEntidad} from '../../../../shared/entidades/regencia/cristaleriaEntidad';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-solicitudes-regencia-agregar',
  templateUrl: './solicitudes-regencia-agregar.component.html',
  styleUrls: ['./solicitudes-regencia-agregar.component.css']
})
export class SolicitudesRegenciaAgregarComponent implements OnInit {


  private formSolicitud: FormGroup;

  // Nombre de la página
  private titulo: string;

  // Usuario a editar/visualizar
  private solicitud: SolicitudRegenciaEntidad;

  // Modo del form
  private modoForm: string;

  public reactivosColumns: string[] = ['nombre', 'pureza', 'cantidad', 'acciones'];

  public cristaleriaColumns: string[] = ['nombre', 'material', 'capacidad', 'cantidad', 'acciones'];

  public dataSourceReactivos = new MatTableDataSource<ReactivoEntidad>();

  public dataSourceCristaleria = new MatTableDataSource<CristaleriaEntidad>();

  @ViewChild(MatSort, {static: true}) sortReactivo: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginatorReactivo: MatPaginator;

  @ViewChild(MatSort, {static: true}) sortCristaleria: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginatorCristaleria: MatPaginator;


  constructor(private solicitudesService: SolicitudesRegenciaService,
              private reactivosService: ReactivosService,
              private critaleriaService: CristaleriaService,
              private fb: FormBuilder,
              private _routeService: Router,
              private _route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.modoForm = this._route.snapshot.params.modo;
    this.solicitud = new SolicitudRegenciaEntidad();

    this.dataSourceReactivos.paginator = this.paginatorReactivo;
    this.dataSourceCristaleria.paginator = this.paginatorCristaleria;
    this.dataSourceReactivos.sort = this.sortReactivo;
    this.dataSourceCristaleria.sort = this.sortCristaleria;

    this.formSolicitud = this.fb.group({

    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Nueva solicitud';
    } else {

      // Llena datos de solicitud

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar Usuarios';
        // Desactiva la llave
      } else {
        this.titulo = 'Visualizar Usuarios';
        this.formSolicitud.disable();
      }
    }
  }

  openDialogReactivos(): void {
    const dialogRef = this.dialog.open(SolicitudesRegenciaReactivos, {
      width: '60rem',
      data: 'test'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}


@Component({
  selector: 'solicitudes-regencia-reactivos',
  templateUrl: 'solicitudes-regencia-reactivos.html',
  styleUrls: ['./solicitudes-regencia-agregar.component.css']
})
export class SolicitudesRegenciaReactivos implements OnInit{

  public displayedColumns: string[] = ['select', 'nombre', 'pureza', 'cantidad', 'estado', 'estante'];

  public dataSource = new MatTableDataSource<ReactivoEntidad>();

  selection = new SelectionModel<ReactivoEntidad>(true, []);

  reactivos: Array<ReactivoEntidad>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<SolicitudesRegenciaReactivos>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private reactivosService: ReactivosService){}

  ngOnInit() {
    this.reactivosService.consultar().subscribe(reactivos => {
      this.dataSource.data = reactivos as ReactivoEntidad[];
      this.reactivos = this.dataSource.data;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ReactivoEntidad): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} }`;
  }
}
