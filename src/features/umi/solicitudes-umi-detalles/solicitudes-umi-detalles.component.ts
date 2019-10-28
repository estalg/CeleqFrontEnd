import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SolicitudUmiEntidad} from '../../../shared/entidades/umi/solicitudUmiEntidad';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UmiService} from '../../../shared/servicios/umi/umi.service';
import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {FileService} from '../../../shared/servicios/archivos/file.service';

@Component({
  selector: 'app-solicitudes-umi-detalles',
  templateUrl: './solicitudes-umi-detalles.component.html',
  styleUrls: ['./solicitudes-umi-detalles.component.css']
})
export class SolicitudesUmiDetallesComponent implements OnInit {

  private formDetalles: FormGroup;

  private estado: string;

  private nombreArchivo: string;

  // Reactivo a editar/visualizar
  private solicitud: SolicitudUmiEntidad;

  constructor(private umiService: UmiService,
              private fileService: FileService,
              private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.solicitud = new SolicitudUmiEntidad();

    this.formDetalles = this.fb.group({
      consecutivo: [''],
      nombreSolicitante: [''],
      telefono: [''],
      contactoAdicional: [''],
      urgencia: [''],
      areaTrabajo: [''],
      lugarTrabajo: [''],
      descripcionTrabajo: [''],
      estado: [''],
      personaAsignada: [''],
      observacionesAprob: [''],
      insumos: [''],
      costoEstimado: [''],
      observacionesAnalisis: [''],
      periodoEjecucion: [''],
      observacionesFinales: [''],
      motivoRechazo: [''],
    });

    this.umiService.consultarSolicitud(this.route.snapshot.params.id, this.route.snapshot.params.anno).then(res => {
      this.solicitud = res;
      this.formDetalles.controls.consecutivo.setValue('UMI-' + this.solicitud.id + '-' + this.solicitud.anno);
      this.formDetalles.controls.nombreSolicitante.setValue(this.solicitud.nombreSolicitante);
      this.formDetalles.controls.telefono.setValue(this.solicitud.telefono);
      this.formDetalles.controls.contactoAdicional.setValue(this.solicitud.contactoAdicional);
      this.formDetalles.controls.urgencia.setValue(this.solicitud.urgencia);
      this.formDetalles.controls.areaTrabajo.setValue(this.solicitud.areaTrabajo);
      this.formDetalles.controls.lugarTrabajo.setValue(this.solicitud.lugarTrabajo);
      this.formDetalles.controls.descripcionTrabajo.setValue(this.solicitud.descripcionTrabajo);
      this.formDetalles.controls.estado.setValue(this.solicitud.estado);
      this.formDetalles.controls.personaAsignada.setValue(this.solicitud.nombrePersonaAsignada);
      this.formDetalles.controls.observacionesAprob.setValue(this.solicitud.observacionesAprob);
      this.formDetalles.controls.insumos.setValue(this.solicitud.insumos);
      this.formDetalles.controls.costoEstimado.setValue(this.solicitud.costoEstimado);
      this.formDetalles.controls.observacionesAnalisis.setValue(this.solicitud.observacionesAnalisis);
      this.formDetalles.controls.periodoEjecucion.setValue(this.solicitud.periodoEjecucion);
      this.formDetalles.controls.observacionesFinales.setValue(this.solicitud.observacionesFinales);
      this.formDetalles.controls.motivoRechazo.setValue(this.solicitud.motivoRechazo);

      this.estado = this.solicitud.estado;

      if (this.estado !== 'Pendiente' && this.estado !== 'Rechazada') {
        if (this.solicitud.ubicacionArchivo !== null || this.solicitud.ubicacionArchivo !== '') {
          this.nombreArchivo = this.solicitud.ubicacionArchivo.substring(this.solicitud.ubicacionArchivo.indexOf('_') + 1);
        }
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

  private descargar() {
    this.fileService.downloadDocument(this.solicitud.ubicacionArchivo).subscribe(res => {
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
