export interface SalesResponse {
  results: Sale[]
}

export interface Sale {
  nombre: string
  descripcion: string
  grupo: string
  presupuesto: string
  venta_neta: string
  venta_iva: string
  ejercido: null | string
  utilidad: string
  porcentaje: string
  NUM_COT: number
  IMP_COT: string
}
