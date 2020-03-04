export class CotizacionEntidad {
  id: number;
  anno: number;
  licitacion: boolean;
  observaciones: string;
  precioMuestreo: number;
  descuento: number;
  gastosAdm: number;
  fechaCotizacion: Date;
  fechaSolicitud: Date;
  fechaRespuesta: Date;
  iva: number;
  granTotal: number;
  moneda: string;
  cotizador: string;
  cliente: string;
  precioMuestra: number;
  diasEntregaRes: number;
  subTotal: number;
  numeroMuestras: number;
  cantidadNecesaria: number;
  unidadMedida: string;
  especifique: string;
  usuarioQuimico: string;
  usuarioFirmante: string;
}
