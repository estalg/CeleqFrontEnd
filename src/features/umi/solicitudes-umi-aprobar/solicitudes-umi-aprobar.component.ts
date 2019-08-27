import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UsuariosService} from '../../../shared/servicios/usuarios/usuarios.service';
import {UsuarioEntidad} from '../../../shared/entidades/usuarioEntidad';
import {DialogoConfirmacionComponent} from '../../../shared/componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {UmiService} from '../../../shared/servicios/umi/umi.service';
import {SolicitudUmiEntidad} from '../../../shared/entidades/umi/solicitudUmiEntidad';

@Component({
  selector: 'app-solicitudes-umi-aprobar',
  templateUrl: './solicitudes-umi-aprobar.component.html',
  styleUrls: ['./solicitudes-umi-aprobar.component.css']
})
export class SolicitudesUmiAprobarComponent implements OnInit {

  private formSolicitud: FormGroup;
  private estadoSolicitud: string;
  private usuariosUmi: UsuarioEntidad[];
  private solicitud: SolicitudUmiEntidad;

  constructor(private fb: FormBuilder,
              private routeService: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private usuarioService: UsuariosService,
              private umiService: UmiService) { }

  ngOnInit() {
    this.consultarUsuariosUmi();
    this.formSolicitud = this.fb.group({
      consecutivo: [''],
      nombreSolicitante: [''],
      telefono: [''],
      contacto: [''],
      urgencia: [''],
      areaTrabajo: [''],
      lugarTrabajo: [''],
      descripcion: [''],
      personaAsignada: [''],
      observaciones: ['', [
        Validators.maxLength(500)
      ]],
      motivoRechazo: ['', [
        Validators.maxLength(500)
      ]]
    });

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
  get personaAsignada() {
    return this.formSolicitud.get('personaAsignada');
  }
  get observaciones() {
    return this.formSolicitud.get('observaciones');
  }
  get motivoRechazo() {
    return this.formSolicitud.get('motivoRechazo');
  }

  private abrirDialogoError(mensaje: string) {
    this.dialog.open(DialogoConfirmacionComponent,
      {
        width: '350px',
        data: {mensaje, tipoMensaje: 'error'}
      });
  }

  consultarUsuariosUmi() {
    this.usuarioService.consultarPorGrupo('UMI').subscribe(result => {
      this.usuariosUmi = result as UsuarioEntidad[];
    }, error => {
      this.abrirDialogoError('Error recuperando la lista de usuarios para asignar. Intentar de nuevo más tarde.');
    });
  }

  cancelar() {
    this.routeService.navigate(['/']);
  }

  aceptar() {
    if (this.estadoSolicitud === 'aprobada') {
      if (this.formSolicitud.controls.personaAsignada.value === '') {
        this.abrirDialogoError('Por favor asignar la solicitud.');
      } else {
        this.solicitud.estado = 'Aprobada';
        this.solicitud.fechaAprobacion = new Date();
        this.solicitud.personaAsignada = this.formSolicitud.controls.personaAsignada.value;
        this.solicitud.observacionesAprob = this.formSolicitud.controls.observaciones.value;

        this.umiService.aprobarSolicitud(this.solicitud).subscribe(res => {
          this.routeService.navigate(['/umi/solicitudes', 'pendientes']);
        }, error => {
          this.abrirDialogoError('Error al comunicarse con la base de datos');
        });
      }
    } else if (this.estadoSolicitud === 'rechazada') {
      if (this.formSolicitud.controls.motivoRechazo.value === '') {
        this.abrirDialogoError('Por favor indique el motivo del rechazo');
      } else {
        this.solicitud.estado = 'Rechazada';
        this.solicitud.motivoRechazo = this.formSolicitud.controls.motivoRechazo.value;
      }
    }
  }
}
