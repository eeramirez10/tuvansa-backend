import { ObjectId } from "mongoose"

export interface Docto {
  name: string
  references: string
  dateProscai: Date
  amount: number
  balance: number
  paid: number
  file?: ObjectId
  supplier: ObjectId

}