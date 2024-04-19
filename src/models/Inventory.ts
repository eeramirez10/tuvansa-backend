import { type ObjectId, model } from 'mongoose';
import { InventoryBody, type Inventory as IInventory, InventoryId } from '../interfaces/inventory.interface';
import { inventorySchema } from '../schemas/inventory';


const Inventory = model<IInventory>('Inventory', inventorySchema)


export class InventoryModel {
  static create = async ({ inventory }: { inventory: InventoryBody }) => {
    let inventoryDB = await Inventory.findOneAndUpdate({ iseq: inventory.iseq, }, inventory, { new: true })

    if (!inventoryDB) {
      inventoryDB = await Inventory.create(inventory)
    }

    return inventoryDB

  }

  static edit = async ({ id, inventory }: { id: string, inventory: InventoryBody }) => {

    let inventoryDB = await Inventory.findByIdAndUpdate(id, inventory, { new: true })

    return inventoryDB

  }

  static getById = async ({ id }: { id: string }): Promise<InventoryId> => {
    let inventoryDB = await Inventory.findById(id)
      .populate('user', ['username', 'name'])
      .populate({
        path: 'counts',
        populate: { path: 'user', select: ['username', 'name'] }
      }) as InventoryId


    return inventoryDB
  }

  static getByIseq = async ({ iseq }: { iseq: string }) => {

    let inventoryDB = await Inventory.findOne({ iseq })
      .populate('user', ['username', 'name'])
      .populate({
        path: 'counts',
        populate: { path: 'user', select: ['username', 'name'] }
      })


    return inventoryDB
  }

  static getByIse = async ({ iseq }: { iseq: string }) => {



    let inventoryDB = await Inventory.findOne({ iseq })
      .populate('user', ['username', 'name'])
      .populate({
        path: 'counts',
        populate: { path: 'user', select: ['username', 'name'] }
      })


    return inventoryDB
  }

  static getStatus = async ({ id }: { id: ObjectId }) => {
    const { paused } = await Inventory.findById(id)

    return paused;
  }

  static getAll = async () => {



    let inventoryDB = await Inventory.find({ 'counts.0': { $exists: true } })
      .populate({ path: 'counts', populate: { path: 'user', select: ['username', 'name'] } })
      .populate({ path: 'user', select: ['username', 'name'] })
      .limit(2)
    return inventoryDB
  }

  static deleteCount = async ({ id, countId }: { id: string, countId: string }) => {
    let inventoryDB = await Inventory.updateOne({ _id: id }, {
      $pull: {
        counts: countId
      }

    }, { new: true })

    return inventoryDB
  }

  static release = async ({ paused }: { paused: boolean }) => {

    console.log(paused)

    const inventoryDB = await Inventory.updateMany({ paused: !paused }, { paused })

    return inventoryDB

  }
}