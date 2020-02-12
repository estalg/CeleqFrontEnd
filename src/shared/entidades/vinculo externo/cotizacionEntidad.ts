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
  saldoAfavor: number;
  granTotal: number;
  moneda: string;
  cotizador: string;
  cliente: string;
  precioMuestra: number;
  diasEntregaRes: number;
  subTotal: number;
  numeroMuestras: number;
  quimico: string;
  firmante: string;
  usuarioQuimico: string;
  usuarioFirmante: string;
}
