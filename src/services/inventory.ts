import { ObjectId } from "mongoose";
import { Inventory, InventoryBody, InventoryId } from "../interfaces/inventory.interface";
import { CountModel } from "../models/Count";
import { InventoryModel } from "../models/Inventory";


interface ReturnProps {
  inventory?: InventoryId,
  error?: string
}


export const createInventory = async ({ input, userId }: { input: InventoryBody, userId: ObjectId }):Promise<ReturnProps>  => {

  const { count } = input

  const inventoryDB = await InventoryModel.create({ inventory:input })

  if (inventoryDB.paused) {
    return { error: 'Inventory is paused' }
  }

  const countDB = await CountModel.create({ input: { count } })

  inventoryDB.counts = inventoryDB.counts.concat(countDB.id)

  countDB.inventory = input
  countDB.user = userId

  inventoryDB.user = userId
  inventoryDB.paused = true

  await inventoryDB.save()

  await countDB.save()

  const inventory = await InventoryModel.getById({ id: inventoryDB.id }) as InventoryId

  return {inventory}


}