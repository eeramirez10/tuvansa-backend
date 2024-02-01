import { BranchOffice } from "./inventory.interface"
import { Supplier } from "./payment"

export interface Doctos {
  idProscai: string
  factura: string
  ordenCompra: string
  supplierFactura: string
  importePesos: string
  importeFactura: string
  saldo: string
  tipoCambio: string
  fecha: string
  supplier: Supplier
  branchOffice: BranchOffice,
  coin: {
    name: string
    code: string
  }

}
