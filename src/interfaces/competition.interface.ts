
const EFECTO_COMPROBANTE_VALUES = {
  INGRESO:'Ingreso',
  EGRESO: 'Egreso',
  NOMINA:'Nomina'
} as const

export type EfectoComprobanteValues = typeof EFECTO_COMPROBANTE_VALUES[keyof typeof EFECTO_COMPROBANTE_VALUES ]





export interface Competition {
  id:                        string;
  FolioFiscal:               string;
  RfcEmisor:                 string;
  NombreRazonSocialEmisor:   string;
  RfcReceptor:               string;
  NombreRazonSocialReceptor: string;
  FechaEmision:              Date;
  FechaCertificacion:        Date;
  Subtotal:                  number;
  Total:                     number;
  EstadoComprobante:         string;
  EfectoComprobante:         string;
  RfcPac:                    string;
  EstatusCancelacion:        string;
}

export interface FechaIon {
  $date: DateClass;
}

export interface DateClass {
  $numberLong: string;
}