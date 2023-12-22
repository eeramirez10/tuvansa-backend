import { CountModel } from "../models/Count"
import { InventoryModel } from "../models/Inventory"



export const deleteInventoryCount = async ({ inventoryId, countId}: { inventoryId: string, countId: string}) => {

  await CountModel.delete({ id: countId })

  const inventory =  await InventoryModel.deleteCount({id: inventoryId, countId})

  return inventory
}