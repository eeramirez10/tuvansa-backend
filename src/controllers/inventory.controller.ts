import { Request, NextFunction, Response } from "express";
import { ObjectId } from "mongoose";
import { InventoryModel } from "../models/Inventory";
import { InventoryBody } from "../interfaces/inventory.interface";
import { createInventory } from "../services/inventory";
import { deleteInventoryCount } from "../services/count";



interface RequestExt extends Request {
  userId: ObjectId;
  body: InventoryBody

}


export class InventoryController {
  static create = async (req: RequestExt, res: Response, next: NextFunction) => {

    const inventory = req.body
    const userId = req.userId

    const newInventory: InventoryBody = {
      iseq: inventory.iseq,
      cod: inventory.cod,
      ean: inventory.ean,
      description: inventory.description,
      quantity: inventory.quantity,
      count: inventory.count,
      branchOffice: inventory.branchOffice
    }

    try {

      const { error, inventory: inv } = await createInventory({ input: newInventory, userId })

      if (error) {
        return res.status(400).json({ error })
      }

      res.status(201).json({ inventory: inv })


    } catch (error) {
      next(error)
    }

  }

  static update = async (req: RequestExt, res: Response, next: NextFunction) => {
    const inventory = req.body
    const id = req.params.id as string
    const userId = req.userId

    const inventoryDB = await InventoryModel.edit({ id, inventory })

    inventoryDB.user = userId;

    await inventoryDB.save()

    res.json({ inventory: await InventoryModel.getById({ id }) })
  }

  static getById = async (req: RequestExt, res: Response, next: NextFunction) => {
    const id = req.params.id as string

    try {

      const inventory = await InventoryModel.getById({ id })

      res.json(inventory)

    } catch (error) {
      next(error)
    }


  }

  static getByIseq = async (req: RequestExt, res: Response, next: NextFunction) => {
    const iseq = req.params.iseq as string
    try {

      const inventory = await InventoryModel.getByIseq({ iseq })

      res.json({ inventory })

    } catch (error) {
      next(error)
    }
  }

  static getAll = async (req: RequestExt, res: Response, next: NextFunction) => {

    try {
      const inventories = await InventoryModel.getAll()

      res.json({ inventories: { items: inventories } })

    } catch (error) {
      next(error)
    }
  }

  static deleteCount = async (req: RequestExt, res: Response, next: NextFunction) => {
    const id = req.params.id as string
    const countId = req.params.countId as string

    
    try {
      const inventory = await deleteInventoryCount({ inventoryId:id, countId})

      res.json({ inventory })
      
    } catch (error) {
      next(error)
    }

  }


}