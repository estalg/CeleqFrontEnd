import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SolicitudUmiEntidad} from '../../../shared/entidades/umi/solicitudUmiEntidad';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UmiService} from '../../../shared/servicios/umi/umi.service';
import {UploadService} from '../../../shared/servicios/upload/upload.service';
import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {print} from 'util';

@Component({
  selector: 'app-solicitudes-umi-analizar',
  templateUrl: './solicitudes-umi-analizar.component.html',
  styleUrls: ['./solicitudes-umi-analizar.component.css']
})
export class SolicitudesUmiAnalizarComponent implements OnInit {

  private formSolicitud: FormGroup;
  private solicitud: SolicitudUmiEntidad;
  uploadResponse;

  constructor(private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private umiService: UmiService,
              private uploadService: UploadService) { }

  ngOnInit() {
    this.formSolicitud = this.fb.group({
      consecutivo: [''],
      nombreSolicitante: [''],
      telefono: [''],
      contacto: [''],
      urgencia: [''],
      areaTrabajo: [''],
      lugarTrabajo: [''],
      descripcion: [''],
      observacionesAprobacion: [''],
      nombrePersonaAsignada: [''],
      insumos: ['', [
        Validators.required,
        Validators.maxLength(500)
      ]],
      costo: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      observacionesAnalisis: ['', [
        Validators.maxLength(500)
      ]],
      archivo: ['']
    });

    // tslint:disable-next-line:max-line-length
    this.umiService.consultarSolicitud(this.route.snapshot.params.id, this.route.snapshot.params.anno).then(res => {
      this.solicitud = res;
      this.formSolicitud.controls.consecutivo.setValue(this.solicitud.id + '-' + this.solicitud.anno);
      this.formSolicitud.controls.nombreSolicitante.setValue(this.solicitud.nombreSolicitante);
      this.formSolicitud.controls.telefono.setValue(this.solicitud.telefono);
      this.formSolicitud.controls.contacto.setValue(this.solicitud.contactoAdicional);
      this.formSolicitud.controls.urgencia.setValue(this.solicitud.urgencia);
      this.formSolicitud.controls.areaTrabajo.setValue(this.solicitud.areaTrabajo);
      this.formSolicitud.controls.lugarTrabajo.setValue(this.solicitud.lugarTrabajo);
      this.formSolicitud.controls.descripcion.setValue(this.solicitud.descripcionTrabajo);
      this.formSolicitud.controls.nombrePersonaAsignada.setValue(this.solicitud.nombrePersonaAsignada);
      this.formSolicitud.controls.observacionesAprobacion.setValue(this.solicitud.observacionesAprob);
    });
  }

  get consecutivo() {
    return this.formSolicitud.get('consecutivo');
  }
  get nombreSolicitante() {
    return this.formSolicitud.get('nombreSolicitante');
  }
  get telefono() {
    return this.formSolicitud.get('telefono');
  }
  get contacto() {
    return this.formSolicitud.get('contacto');
  }
  get urgencia() {
    return this.formSolicitud.get('urgencia');
  }
  get areaTrabajo() {
    return this.formSolicitud.get('areaTrabajo');
  }
  get lugarTrabajo() {
    return this.formSolicitud.get('lugarTrabajo');
  }
  get descripcion() {
    return this.formSolicitud.get('descripcion');
  }
  get observacionesAprobacion() {
    return this.formSolicitud.get('observacionesAprobacion');
  }
  get insumos() {
    return this.formSolicitud.get('insumos');
  }
  get costo() {
    return this.formSolicitud.get('costo');
  }
  get observacionesAnalisis() {
    return this.formSolicitud.get('observacionesAnalisis');
  }
  get archivo() {
    return this.formSolicitud.get('archivo');
  }
  get nombrePersonaAsignada() {
    return this.formSolicitud.get('nombrePersonaAsignada');
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

  aceptar() {
    if (this.formSolicitud.get('archivo').value !== '') {
      const formData = new FormData();
      formData.append('archivo', this.formSolicitud.get('archivo').value);

      this.uploadService.subirArchivo(formData, 'umi').subscribe(
        (res) => {
          this.uploadResponse = res.url;
          this.uploadResponse = this.uploadResponse.substring(this.uploadResponse.indexOf('/uploads/'));
          this.analizarSolicitud();
        },
        (err) => {
          this.uploadResponse = 'error';
          this.abrirDialogoError('Ha ocurrido un error subiendo el archivo');
        }
      );
    } else {
      this.uploadResponse = '';
      this.analizarSolicitud();
    }
  }

  analizarSolicitud() {
    let solicitudActualizada: SolicitudUmiEntidad;
    solicitudActualizada = this.solicitud;
    solicitudActualizada.estado = 'Analizada';
    solicitudActualizada.insumos = this.formSolicitud.controls.insumos.value;
    solicitudActualizada.costoEstimado = this.formSolicitud.controls.costo.value;
    solicitudActualizada.observacionesAnalisis = this.formSolicitud.controls.observacionesAnalisis.value;
    solicitudActualizada.ubicacionArchivo = this.uploadResponse;
    this.umiService.analizarSolicitud(solicitudActualizada).subscribe(res => {
      this.routeService.navigate(['/umi/solicitudes', 'aprobadas']);
    }, error => {
      this.abrirDialogoError('Error al comunicarse con la base de datos');
    });
}

  cancelar() {
    this.routeService.navigate(['/umi/solicitudes/aprobadas']);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formSolicitud.controls.archivo.setValue(file);
    }
  }
}
