import {Component, OnInit, ViewChild} from '@angular/core';
import {GrupoEntidad} from '../../../shared/entidades/grupoEntidad';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UsuarioEntidad} from '../../../shared/entidades/usuarioEntidad';
import {SelectionModel} from '@angular/cdk/collections';
import {GruposService} from '../../../shared/servicios/grupos/grupos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuariosService} from '../../../shared/servicios/usuarios/usuarios.service';
import {PermisoEntidad} from '../../../shared/entidades/permisoEntidad';

@Component({
  selector: 'app-grupos-asignar',
  templateUrl: './grupos-asignar.component.html',
  styleUrls: ['./grupos-asignar.component.css']
})
export class GruposAsignarComponent implements OnInit {

  private formGrupo: FormGroup;

  // Grupos
  private grupos: GrupoEntidad[];

  public displayedColumns: string[] = ['select', 'cedula', 'nombre'];

  public dataSource = new MatTableDataSource<UsuarioEntidad>();

  private usuariosGrupo: UsuarioEntidad[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  usuarios: Array<UsuarioEntidad>;

  selection = new SelectionModel<UsuarioEntidad>(true, []);

  constructor(private gruposService: GruposService,
              private usuariosService: UsuariosService,
              private fb: FormBuilder,
              // tslint:disable-next-line:variable-name
              private _routeService: Router,
              // tslint:disable-next-line:variable-name
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this.consultarGrupos();
    this.consultarUsuarios();
    this.formGrupo = this.fb.group({
      descripcion: ['', [
        Validators.required
      ]]
    });
  }

  get descripcion() {
    return this.formGrupo.get('descripcion');
  }

  private consultarGrupos() {
    this.gruposService.consultar().subscribe(res => {
      this.grupos = res as GrupoEntidad[];
    });
  }

  private consultarUsuarios() {
    this.usuariosService.consultar().subscribe(usuarios => {
      this.dataSource.data = usuarios as UsuarioEntidad[];
      this.usuarios = this.dataSource.data;
    });
  }

  private marcarUsuarios() {
    this.gruposService.consultarUsuariosGrupo(this.formGrupo.controls.descripcion.value).subscribe(usuarios => {
      this.usuariosGrupo = usuarios as UsuarioEntidad[];
      this.selection.clear();
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.usuariosGrupo.length; ++i) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.usuarios.length; ++j) {
          if (this.usuariosGrupo[i].cedula === this.usuarios[j].cedula) {
            this.selection.select(this.usuarios[j]);
          }
        }

      }
    });
  }

  private asignar() {
    const grupo = new GrupoEntidad();
    grupo.descripcion = this.formGrupo.controls.descripcion.value;
    grupo.usuarios = this.selection.selected;
    this.gruposService.asignarUsuariosGrupo(grupo).subscribe(res => {
      this._routeService.navigate(['/grupos']);
    });
  }

  private cancelar() {
    this._routeService.navigate(['/grupos']);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UsuarioEntidad): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} }`;
  }


}
