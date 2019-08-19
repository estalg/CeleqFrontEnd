import {UsuarioEntidad} from '../usuarioEntidad';

export class SolicitudUmiEntidad {
  id: number;
  anno: number;
  nombreSolicitante: string;
  telefono: string;
  contactoAdicional: string;
  urgencia: string;
  areaTrabajo: string;
  lugarTrabajo: string;
  descripcionTrabajo: string;
  usuario: UsuarioEntidad;
}
