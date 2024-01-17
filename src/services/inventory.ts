import { ObjectId } from "mongoose";
import { Inventory, InventoryBody, InventoryId } from "../interfaces/inventory.interface";
import { CountModel } from "../models/Count";
import { InventoryModel } from "../models/Inventory";
import { ProscaiInventoryModel } from "../models/proscai/Inventory";


interface ReturnProps {
  inventory?: InventoryId,
  error?: string
}


export const createInventory = async ({ count, iseq, userId }: { count: number, iseq: string, userId: ObjectId }): Promise<ReturnProps> => {


  const isPaused = await getIsInventoryPaused({ iseq })

  if (isPaused) {
    return { error: 'Inventory is paused' }
  }

  const inventoryProscai = await ProscaiInventoryModel.getByIseq({ iseq })

  const inventoryDB = await InventoryModel.create({ inventory: inventoryProscai })



  const countDB = await CountModel.create({ input: { count } })

  inventoryDB.counts = inventoryDB.counts.concat(countDB.id)

  countDB.inventory = inventoryDB.toJSON()
  countDB.user = userId

  inventoryDB.user = userId
  inventoryDB.paused = true

  await inventoryDB.save()

  await countDB.save()

  const inventory = await InventoryModel.getById({ id: inventoryDB.id }) as InventoryId

  return { inventory }


}


export const getIsInventoryPaused = async ({ iseq }: { iseq: string }): Promise<boolean> => {

  const inventoryDB = await InventoryModel.getByIseq({ iseq })

  return inventoryDB === null ? false : inventoryDB.paused

}