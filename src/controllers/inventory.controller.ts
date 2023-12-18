import { Request, NextFunction, Response } from "express";
import { ObjectId } from "mongoose";
import { CountModel } from "../models/Count";
import { InventoryModel } from "../models/Inventory";
import { InventoryBody } from "../interfaces/inventory.interface";



interface RequestExt extends Request {
  userId: ObjectId;
  body: InventoryBody

}


export class InventoryController {
  static create = async (req: RequestExt, res: Response, next: NextFunction) => {

    const inventory = req.body
    const userId = req.userId

    try {

      const inventoryDB = await InventoryModel.create({ inventory })

      if (inventoryDB.paused) {
        return res.status(400).json({ error: 'Inventory is paused' })
      }

      const count = await CountModel.create({ input: { count: inventory.count } })

      inventoryDB.counts = inventoryDB.counts.concat(count.id)

      inventoryDB.user = userId
      inventoryDB.paused = true

      count.user = userId

      await inventoryDB.save()

      await count.save()


      res.json({ inventory: await InventoryModel.getById({ id: inventoryDB.id }) })

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

    res.json({ inventory: await InventoryModel.getById({id}) })
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


}