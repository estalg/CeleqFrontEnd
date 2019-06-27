import {ReactivoEntidad} from './reactivoEntidad';
import {CristaleriaEntidad} from './cristaleriaEntidad';

export class SolicitudRegenciaEntidad {
  id: number;
  anno: number;
  fechaSolicitud: Date;
  fechaAprobacion: Date;
  estado: string;
  nombreSolicitante: string;
  nombreEncargado: string;
  correoSolicitante: string;
  observacion: string;
  unidad: string;
  reactivosSolicitados: ReactivoEntidad[];
  cristaleriaSolicitada: CristaleriaEntidad[];
}
