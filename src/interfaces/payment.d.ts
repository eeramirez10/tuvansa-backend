import { type ObjectId } from "mongoose"
import { IUser } from "./user.types"
import { Docto } from "./docto.interface"
import { BranchOffice } from "./inventory.interface"
import { Creditor } from "./creditor.interface"


export interface IPayment {
  id?: ObjectId
  supplier: ObjectId | null
  creditor: ObjectId | null
  amount: number
  comments?: string
  branchOffice: BranchOffice
  datePaid: Date
  files?: ObjectId[]
  user?: ObjectId
  coin: {
    name: string
    code: string
  },
  category: ObjectId,
  subcategory: ObjectId
  proscai: ObjectId | null
}

export interface Paymentt {
  supplier: ObjectId
  doctos: Docto[]
  user: ObjectId
}

export interface PaymenttBody {
  category: ObjectId
  subcategory: ObjectId
  idProscai: string | null
  supplier: Supplier | null
  creditor: Creditor | null
  coin: {
    name: string
    code: string
  }
  amount: number
  branchOffice: BranchOffice
  datePaid: Date
}

export interface PaymentBodyId extends PaymentBody {
  id: ObjectId
}

export interface PaymentBody {
  supplier: Supplier
  docto: string
  paid: number
  comments: string
  datePaid: Date
}

export interface Supplier {
  id: ObjectId
  uid: string
  name: string
}

export interface SupplierId extends Supplier {
  id: ObjectId
}

export interface File {
  id?: string,
  name: string
  originalName: string
  ext: string,
  doc?: ObjectId
  docModel?: string
}


export type PaymentId = Pick<IPayment, 'id'>