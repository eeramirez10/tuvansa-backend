import { type ObjectId } from "mongoose"

export interface Inventory {
  iseq: string
  cod: string
  ean: string
  quantity: string
  description: string
  counts: ObjectId[]
  shelters?: ObjectId[]
  user: ObjectId
  paused: boolean,
  costo: string
  branchOffice: {
    name: BranchOffice
    code: BranchOfficeCode
  } 
}

export enum BranchOffice {
  Mexico = 'Mexico',
  Monterrey = 'Monterrey',
  Veracruz = 'Veracruz',
  Mexicali = 'Mexicali',
  Queretaro = 'Queretaro',
  Cancun = 'Cancun'
}

export enum BranchOfficeCode {
  Mexico = '01',
  Monterrey = '02',
  Veracruz = '03',
  Mexicali = '04',
  Queretaro = '05',
  Cancun = '06'
}

export interface InventoryId extends Inventory {
  id: ObjectId
}
export interface Count {
  count: number
  user?: ObjectId
  inventory?: CountInventory
}

export interface CountInventory {
  iseq: string
  cod: string
  ean: string
  quantity: number
  description: string
  user?: ObjectId

}

export interface InventoryBody {
  iseq: string
  cod: string
  ean: string
  description: string
  quantity: number
  count: number
  branchOffice: {
    name: BranchOffice
    code: BranchOfficeCode
  } 

}