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
import {formatDate} from '@angular/common';
import {UnidadEntidad} from '../../../../shared/entidades/unidad/unidadEntidad';
import {UnidadesService} from '../../../../shared/servicios/unidades/unidades.service';

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

  private unidades: UnidadEntidad[];

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
              public dialog: MatDialog,
              private unidadesService: UnidadesService) { }

  ngOnInit() {
    this.modoForm = this._route.snapshot.params.modo;
    this.solicitud = new SolicitudRegenciaEntidad();

    this.dataSourceReactivos.paginator = this.paginatorReactivo;
    this.dataSourceCristaleria.paginator = this.paginatorCristaleria;
    this.dataSourceReactivos.sort = this.sortReactivo;
    this.dataSourceCristaleria.sort = this.sortCristaleria;

    this.formSolicitud = this.fb.group({
      nombreSolicitante: ['', [
        Validators.required
      ]],
      correoSolicitante: ['', [
        Validators.required,
        Validators.email
      ]],
      nombreEncargado: [''],
      observaciones: [''],
      unidad: ['']
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Nueva solicitud de reactivos y cristalería P-05:PC-01:F-02';
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

    this.unidadesService.consultar().subscribe(
      unidades => {
        this.unidades = unidades as UnidadEntidad[];
      });
  }

  get nombreSolicitante(){
    return this.formSolicitud.get('nombreSolicitante');
  }
  get correoSolicitante(){
    return this.formSolicitud.get('correoSolicitante');
  }
  get nombreEncargado(){
    return this.formSolicitud.get('nombreEncargado');
  }
  get observaciones(){
    return this.formSolicitud.get('observaciones');
  }
  get unidad() {
    return this.formSolicitud.get('unidad');
  }

  openDialogReactivos(): void {
    const dialogRef = this.dialog.open(SolicitudesRegenciaReactivos, {
      width: '60rem',
      data: this.dataSourceReactivos.data as ReactivoEntidad[],
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result=> {
      this.dataSourceReactivos.data = result as ReactivoEntidad[];
      this.dataSourceReactivos.data.forEach(function(reactivo) {
        reactivo.cantidadSolicitada = 0;
      })
    });
  }

  onKeyReactivo(event: any, reactivo: ReactivoEntidad) {
    reactivo.cantidadSolicitada = event.target.value;
  }

  borrarReactivo(reactivo: ReactivoEntidad){
    const index = this.dataSourceReactivos.data.indexOf(reactivo);
    if(index !== -1){
      this.dataSourceReactivos.data.splice(index, 1);
      this.dataSourceReactivos._updateChangeSubscription();
    }
  }

  openDialogCristaleria(): void {
    const dialogRef = this.dialog.open(SolicitudesRegenciaCristaleria, {
      width: '60rem',
      data: this.dataSourceCristaleria.data as CristaleriaEntidad[],
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result=> {
      this.dataSourceCristaleria.data = result as CristaleriaEntidad[];
      this.dataSourceCristaleria.data.forEach(function(cristaleria) {
        cristaleria.cantidadSolicitada = 0;
      })
    });
  }

  onKeyCristaleria(event: any, cristaleria: CristaleriaEntidad) {
    cristaleria.cantidadSolicitada = event.target.value;
  }

  borrarCristaleria(cristaleria: CristaleriaEntidad){
    const index = this.dataSourceCristaleria.data.indexOf(cristaleria);
    if(index !== -1){
      this.dataSourceCristaleria.data.splice(index, 1);
      this.dataSourceCristaleria._updateChangeSubscription();
    }
  }

  cancelar(){
    this._routeService.navigate(['/']);
  }

  agregar() {
    let valido = true;
    if(this.dataSourceReactivos.data.length > 0){
      this.dataSourceReactivos.data.forEach(function(reactivo) {
        if(reactivo.cantidadSolicitada < 1){
          valido = false;
        }
      });
    }

    if(this.dataSourceCristaleria.data.length > 0){
      this.dataSourceCristaleria.data.forEach(function(cristaleria) {
        if(cristaleria.cantidadSolicitada < 1){
          valido = false;
        }
      });
    }

    if(valido){
      let solicitud = new SolicitudRegenciaEntidad();
      solicitud.anno = (new Date()).getFullYear();
      solicitud.fechaSolicitud = new Date();
      solicitud.estado = "Pendiente";
      solicitud.nombreSolicitante = this.formSolicitud.controls.nombreSolicitante.value;
      solicitud.correoSolicitante = this.formSolicitud.controls.correoSolicitante.value;
      solicitud.nombreEncargado = this.formSolicitud.controls.nombreEncargado.value;
      solicitud.observacion = this.formSolicitud.controls.observaciones.value;
      solicitud.unidad = this.formSolicitud.controls.unidad.value;
      solicitud.reactivosSolicitados = new Array();
      solicitud.cristaleriaSolicitada = new Array();

      this.dataSourceReactivos.data.forEach(function(reactivo) {
        solicitud.reactivosSolicitados.push(reactivo);
      })

      this.dataSourceCristaleria.data.forEach(function(cristaleria) {
        solicitud.cristaleriaSolicitada.push(cristaleria);
      })

      console.log(solicitud);
      this.solicitudesService.agregarSolicitud(solicitud).subscribe(result =>{
        this._routeService.navigate(['/']);
      })
    }

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
              @Inject(MAT_DIALOG_DATA) public data: ReactivoEntidad[],
              private reactivosService: ReactivosService){}

  ngOnInit() {
    this.reactivosService.consultar().subscribe(reactivos => {
      this.dataSource.data = reactivos as ReactivoEntidad[];
      this.reactivos = this.dataSource.data;
      this.marcarReactivos();
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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ReactivoEntidad): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} }`;
  }

  contieneReactivo(obj: ReactivoEntidad, list: ReactivoEntidad[]) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].nombre === obj.nombre && list[i].pureza === obj.pureza) {
        return true;
      }
    }

    return false;
  }

  marcarReactivos(){
    for(let i=0; i<this.dataSource.data.length; i++){
      if(this.contieneReactivo(this.dataSource.data[i], this.data)){
        this.selection.select(this.dataSource.data[i]);
      }
    }
  }

}



@Component({
  selector: 'solicitudes-regencia-cristaleria',
  templateUrl: 'solicitudes-regencia-cristaleria.html',
  styleUrls: ['./solicitudes-regencia-agregar.component.css']
})
export class SolicitudesRegenciaCristaleria implements OnInit{

  public displayedColumns: string[] = ['select', 'nombre', 'material', 'capacidad', 'cantidad', 'caja'];

  public dataSource = new MatTableDataSource<CristaleriaEntidad>();

  selection = new SelectionModel<CristaleriaEntidad>(true, []);

  cristaleria: Array<CristaleriaEntidad>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<SolicitudesRegenciaReactivos>,
              @Inject(MAT_DIALOG_DATA) public data: CristaleriaEntidad[],
              private cristaleriaService: CristaleriaService){}

  ngOnInit() {
    this.cristaleriaService.consultar().subscribe(cristaleria => {
      this.dataSource.data = cristaleria as CristaleriaEntidad[];
      this.cristaleria = this.dataSource.data;
      this.marcarCristaleria();
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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CristaleriaEntidad): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} }`;
  }

  contieneCristaleria(obj: CristaleriaEntidad, list: CristaleriaEntidad[]) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].nombre === obj.nombre && list[i].material === obj.material && list[i].capacidad === obj.capacidad) {
        return true;
      }
    }

    return false;
  }

  marcarCristaleria(){
    for(let i=0; i<this.dataSource.data.length; i++){
      if(this.contieneCristaleria(this.dataSource.data[i], this.data)){
        this.selection.select(this.dataSource.data[i]);
      }
    }
  }

}
