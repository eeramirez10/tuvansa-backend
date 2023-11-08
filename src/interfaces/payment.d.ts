import { type ObjectId } from "mongoose"

export interface IPayment {
  id?: ObjectId
  supplier: Supplier
  docto: string
  amount?: string
  comments?: string
  files?: File
}

export interface Supplier {
  id: string
  name: stringS
}

export interface File {
  id: string,
  name: string
  ext: string
}