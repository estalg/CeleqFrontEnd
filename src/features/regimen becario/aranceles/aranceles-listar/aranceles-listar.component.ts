import { Component, OnInit } from '@angular/core';
import {ArancelEntidad} from '../../../../shared/entidades/regimen becario/arancelEntidad';
import {ArancelesService} from '../../../../shared/servicios/regimen becario/aranceles/aranceles.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-aranceles-listar',
  templateUrl: './aranceles-listar.component.html',
  styleUrls: ['./aranceles-listar.component.css']
})
export class ArancelesListarComponent implements OnInit {

  aranceles: Array<ArancelEntidad>;

  public dataSource = new MatTableDataSource<ArancelEntidad>();

  private formAranceles: FormGroup;

  constructor(private arancelesService: ArancelesService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarAranceles();

    this.formAranceles = this.fb.group({
      monto: ['', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]],
    });
  }

  get monto() {
    return this.formAranceles.get('monto');
  }

  private consultarAranceles = () => {
    this.arancelesService.consultar().subscribe(
      aranceles => {
        this.dataSource.data = aranceles as ArancelEntidad[];
        this.aranceles = this.dataSource.data;
      },
      error => {
        this.abrirDialogoError('Error al cargar la lista');
      });
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

}
