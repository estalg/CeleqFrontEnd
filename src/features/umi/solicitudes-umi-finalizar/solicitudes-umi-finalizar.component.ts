import { Component, OnInit } from '@angular/core';
import {SolicitudUmiEntidad} from '../../../shared/entidades/umi/solicitudUmiEntidad';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UmiService} from '../../../shared/servicios/umi/umi.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {FileService} from '../../../shared/servicios/archivos/file.service';

@Component({
  selector: 'app-solicitudes-umi-finalizar',
  templateUrl: './solicitudes-umi-finalizar.component.html',
  styleUrls: ['./solicitudes-umi-finalizar.component.css']
})
export class SolicitudesUmiFinalizarComponent implements OnInit {

  private solicitud: SolicitudUmiEntidad;
  private formSolicitud: FormGroup;
  private nombreArchivo: string;

  constructor(private solicitudUmiService: UmiService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private fileService: FileService) { }

  ngOnInit() {
    this.solicitud = new SolicitudUmiEntidad();

    this.formSolicitud = this.fb.group({
      consecutivo: [''],
      nombreSolicitante: [''],
      telefono: [''],
      contactoAdicional: [''],
      urgencia: [''],
      areaTrabajo: [''],
      lugarTrabajo: [''],
      descripcionTrabajo: [''],
      insumos: [''],
      costoAproximado: [''],
      observacionesAnalisis: [''],
      estado: [''],
      periodo: [''],
      observaciones: ['']
    });

    this.solicitudUmiService.consultarSolicitud(this.route.snapshot.params.id, this.route.snapshot.params.anno).then(res => {
      this.solicitud = res;
      this.formSolicitud.controls.consecutivo.setValue('UMI-' + this.solicitud.id + '-' + this.solicitud.anno);
      this.formSolicitud.controls.nombreSolicitante.setValue(this.solicitud.nombreSolicitante);
      this.formSolicitud.controls.telefono.setValue(this.solicitud.telefono);
      this.formSolicitud.controls.contactoAdicional.setValue(this.solicitud.contactoAdicional);
      this.formSolicitud.controls.urgencia.setValue(this.solicitud.urgencia);
      this.formSolicitud.controls.areaTrabajo.setValue(this.solicitud.areaTrabajo);
      this.formSolicitud.controls.lugarTrabajo.setValue(this.solicitud.lugarTrabajo);
      this.formSolicitud.controls.descripcionTrabajo.setValue(this.solicitud.descripcionTrabajo);
      this.formSolicitud.controls.insumos.setValue(this.solicitud.insumos);
      this.formSolicitud.controls.costoAproximado.setValue(this.solicitud.costoEstimado);
      this.formSolicitud.controls.observacionesAnalisis.setValue(this.solicitud.observacionesAnalisis);

      if (this.solicitud.ubicacionArchivo !== '') {
        this.nombreArchivo = this.solicitud.ubicacionArchivo.substring(this.solicitud.ubicacionArchivo.indexOf('-') + 1);
      }
    });

  }

  get periodo() {
    return this.formSolicitud.get('periodo');
  }
  get observaciones() {
    return this.formSolicitud.get('observaciones');
  }

  cancelar() {
    this.routeService.navigate(['/']);
  }

  finalizar() {
    const nuevaSolicitud = new SolicitudUmiEntidad();

    nuevaSolicitud.id = this.route.snapshot.params.id;
    nuevaSolicitud.anno = this.route.snapshot.params.anno;
    nuevaSolicitud.periodoEjecucion = this.formSolicitud.controls.periodo.value;
    nuevaSolicitud.observacionesFinales = this.formSolicitud.controls.observaciones.value;

    this.solicitudUmiService.finalizarSolicitud(nuevaSolicitud).subscribe(result => {
      this.routeService.navigate(['/']);
    }, error => {
      this.abrirDialogoError('Error al conectarse con la base de datos. Intente de nuevo más tarde.');
    });
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

  private descargar() {
    this.fileService.downloadFile(this.solicitud.ubicacionArchivo).subscribe(res => {
      const dataType = res.type;
      const binaryData = [];
      binaryData.push(res);
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      const filename = this.nombreArchivo;
      downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }, error => {
      this.abrirDialogoError('Ha ocurrido un error descargando el archivo.');
    });
  }

}
