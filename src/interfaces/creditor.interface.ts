import { ObjectId } from "mongoose"

export interface Creditor {
  id: ObjectId
  uid: string
  name: string
}