import { type ObjectId } from "mongoose"

export interface IPayment {
  id?: ObjectId
  supplier?: ObjectId
  docto: string
  paid?: number
  comments?: string
  datePaid: Date
  files?: ObjectId []
}

export interface Supplier {
  id?: ObjectId
  idProscai: string
  name: string
}

export interface File {
  id?: string,
  name: string
  ext: string,
  payment?: ObjectId
}


export type PaymentId = Pick<IPayment, 'id'>