import { ObjectId } from "mongoose"

export interface PurchaseOrder {
  proscai: string
  provider: string
  purchaseOrder: string
  pedPrv: string
  from: Date
  due: Date
  warehouse: string
  captureDate: Date
  pcs: string
  amount: string
  currency: string
  exchangeRate: string
  comment: string
  authorized: boolean
  file?: ObjectId
  signedFile?: ObjectId
  user?: ObjectId
  authorizedBy?: ObjectId
}