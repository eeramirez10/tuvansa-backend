import { type ObjectId } from "mongoose"

export interface Inventory {
  iseq: string
  cod: string
  ean: string
  quantity: string
  description: string
  counts: ObjectId[]
  user: ObjectId
  paused: boolean
}
export interface Count {
  count: number
  user?: ObjectId
}

export interface InventoryBody {
  iseq: string
  cod: string
  ean: string
  description: string
  quantity: number
  paused: boolean
  count: number

}