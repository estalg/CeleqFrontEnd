import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GrupoEntidad} from '../../../shared/entidades/grupoEntidad';
import {ActivatedRoute, Router} from '@angular/router';
import {GruposService} from '../../../shared/servicios/grupos/grupos.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PermisoEntidad} from '../../../shared/entidades/permisoEntidad';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-grupos-agregar',
  templateUrl: './grupos-agregar.component.html',
  styleUrls: ['./grupos-agregar.component.css']
})
export class GruposAgregarComponent implements OnInit {

  formGrupo: FormGroup;

  // Nombre de la página
  titulo: string;

  // Grupo a editar/visualizar
  private grupo: GrupoEntidad;

  // Modo del form
  modoForm: string;

  permisos: Array<PermisoEntidad>;

  public displayedColumns: string[] = ['select', 'descripcion'];

  public dataSource = new MatTableDataSource<PermisoEntidad>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  selection = new SelectionModel<PermisoEntidad>(true, []);

  constructor(private gruposService: GruposService,
              private fb: FormBuilder,
              // tslint:disable-next-line:variable-name
              private _routeService: Router,
              // tslint:disable-next-line:variable-name
              private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.modoForm = this._route.snapshot.params.modo;
    this.grupo = new GrupoEntidad();
    this.consultarPermisos();

    this.formGrupo = this.fb.group({
      descripcion: ['', [
        Validators.required
      ]]
    });

    if (this.modoForm === 'agregar') {
      this.titulo = 'Agregar Grupo';
    } else {
      this.formGrupo.controls.descripcion.setValue(this._route.snapshot.params.descripcion);
      this.formGrupo.controls.descripcion.disable();
      this.consultarPermisosGrupo();

      if (this.modoForm === 'editar') {
        this.titulo = 'Editar Usuarios';
      } else {
        this.titulo = 'Visualizar Usuarios';
      }
    }
  }

  get descripcion() {
    return this.formGrupo.get('descripcion');
  }

  cancelar() {
    this._routeService.navigate(['/grupos']);
  }

  private agregar() {
    const grupo = new GrupoEntidad();
    grupo.descripcion = this.formGrupo.controls.descripcion.value;
    grupo.permisos = this.selection.selected;
    this.gruposService.agregar(grupo).subscribe(res => {
      this._routeService.navigate(['/grupos']);
    });
  }

  private editar() {
    const grupo = new GrupoEntidad();
    grupo.descripcion = this.formGrupo.controls.descripcion.value;
    grupo.permisos = this.selection.selected;
    this.gruposService.editar(grupo).subscribe(res => {
      this._routeService.navigate(['/grupos']);
    });
  }

  private consultarPermisos() {
    this.gruposService.consultarPermisos().subscribe(permisos => {
      this.dataSource.data = permisos as PermisoEntidad[];
      this.permisos = this.dataSource.data;
    });
  }

  private consultarPermisosGrupo() {
    this.gruposService.consultarPermisosGrupo(this.formGrupo.controls.descripcion.value).subscribe(permisos => {
      const perm = permisos as any;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < perm.length; ++i) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.permisos.length; ++j) {
          if (+perm[i].permiso === this.permisos[j].id) {
            this.selection.select(this.permisos[j]);
          }
        }
      }
    });
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
  checkboxLabel(row?: PermisoEntidad): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} }`;
  }

}
