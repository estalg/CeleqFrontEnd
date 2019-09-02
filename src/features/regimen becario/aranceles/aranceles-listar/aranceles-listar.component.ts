import { Component, OnInit } from '@angular/core';
import {ArancelEntidad} from '../../../../shared/entidades/regimen becario/arancelEntidad';
import {ArancelesService} from '../../../../shared/servicios/regimen becario/aranceles/aranceles.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {FormGroup} from '@angular/forms';

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
              public dialog: MatDialog) { }

  ngOnInit() {
    this.consultarAranceles();
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
