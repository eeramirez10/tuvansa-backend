import { type ObjectId } from "mongoose"
import { IUser } from "./user.types"
import { Docto } from "./docto.interface"


export interface IPayment {
  id?: ObjectId
  supplier: ObjectId
  docto: string
  paid?: number
  comments?: string
  datePaid: Date
  files?: ObjectId []
  user?: ObjectId
}

export interface Paymentt {
  supplier: ObjectId
  doctos: Docto[]
  user: ObjectId
}

export interface PaymenttBody {
  supplier: Supplier,
  doctos: Docto[]
}

export interface PaymentBody {
  supplier: Supplier
  docto: string
  paid: number
  comments: string
  datePaid: Date
}

export interface Supplier {
  idProscai: string
  name: string
}

export interface SupplierId extends Supplier {
  id: ObjectId
}

export interface File {
  id?: string,
  name: string
  ext: string,
  payment?: ObjectId
}


export type PaymentId = Pick<IPayment, 'id'>