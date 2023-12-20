import { ObjectId, model } from 'mongoose';
import { InventoryBody, type Inventory as IInventory } from '../interfaces/inventory.interface';
import { inventorySchema } from '../schemas/inventory';
import { populate } from 'dotenv';

const Inventory = model<IInventory>('Inventory', inventorySchema)


export class InventoryModel {
  static create = async ({ inventory }: { inventory: InventoryBody }) => {
    let inventoryDB = await Inventory.findOne({ iseq: inventory.iseq })
    if (!inventoryDB) {
      inventoryDB = await Inventory.create(inventory)
    }

    return inventoryDB

  }

  static edit = async ({ id, inventory }: { id: string, inventory: InventoryBody }) => {

    let inventoryDB = await Inventory.findByIdAndUpdate(id, inventory, { new: true })

    return inventoryDB

  }

  static getById = async ({ id }: { id: string }) => {
    let inventoryDB = await Inventory.findById(id)
      .populate('user', ['username', 'name'])
      .populate({
        path: 'counts',
        populate: { path: 'user', select: ['username', 'name'] }
      })


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

  static getStatus = async ({ id }: { id: ObjectId }) => {
    const { paused } = await Inventory.findById(id)

    return paused;
  }

  static getAll = async () => {
    let inventoryDB = await Inventory.find({})
      .populate({ path:'counts',  populate: { path: 'user', select: ['username', 'name'] }})
      .populate({ path:'user', select: ['username', 'name']})
    return inventoryDB
  }
}