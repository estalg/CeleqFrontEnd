import {EstudianteEntidad} from './estudianteEntidad';

export class DesignacionEntidad extends EstudianteEntidad {
  id: number;
  anno: number;
  ciclo: string;
  fechaInicio: Date;
  fechaFinal: Date;
  convocatoria: string;
  horas: number;
  modalidad: string;
  monto: number;
  inopia: boolean;
  motivoInopia: string;
  tramitado: boolean;
  observaciones: string;
  idEstudiante: string;
  presupuesto: string;
  responsable: string;
  unidad: string;
  adHonorem: boolean;
}
