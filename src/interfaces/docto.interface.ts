import { Supplier } from "./payment"
import { BranchOffice } from "./inventory.interface"
import { ObjectId } from "mongoose"

export interface Docto {
  id: ObjectId | string
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