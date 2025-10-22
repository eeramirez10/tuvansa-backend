import { ObjectId } from "mongoose"

export interface Remission {
  proscai: string
  dateProscai: string
  remission: string
  order: string
  references?: string
  customer: string
  amount: string
  agent: string
  authorized: boolean
  file?: ObjectId
  signedFile?: ObjectId
  user?: ObjectId
  authorizedBy?: ObjectId
}