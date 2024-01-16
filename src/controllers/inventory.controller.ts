import { Request, NextFunction, Response } from "express";
import { ObjectId } from "mongoose";
import { InventoryModel } from "../models/Inventory";
import { BranchOffice, Count, InventoryBody } from "../interfaces/inventory.interface";
import { createInventory } from "../services/inventory";
import { deleteInventoryCount } from "../services/count";
import { ProscaiInventoryModel } from "../models/proscai/Inventory";
import { Shelter } from "../interfaces/shelter.interface";
import { UserId } from "../interfaces/user.types";

export interface Inventory {
  id: string
  iseq: string
  cod: string
  ean: string
  description: string
  quantity: string
  costo?: string
  paused?: boolean
  counts: Count[]
  shelters?: Shelter
  createdAt?: Date
  updatedAt?: Date
  user?: UserId
  branchOffice: BranchOffice
}


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

  // static getByIseq = async (req: RequestExt, res: Response, next: NextFunction) => {
  //   const iseq = req.params.iseq as string
  //   try {

  //     const inventory = await InventoryModel.getByIseq({ iseq })

  //     res.json({ inventory })

  //   } catch (error) {
  //     next(error)
  //   }
  // }

  static getByIseq = async (req: RequestExt, res: Response, next: NextFunction) => {
    const iseq = req.params.iseq as string

    try {

      const [inventory,inventoryProscai ] = await Promise.all([InventoryModel.getByIseq({ iseq }), ProscaiInventoryModel.getByIseq({ iseq })])

      let newinventory;

      if (inventory) {
        newinventory = {
          ...inventory.toJSON(),
          quantity: inventoryProscai.quantity,
          costo: inventory.costo ?? inventoryProscai.costo
        }
      } else {
        newinventory = {
          ...inventoryProscai,
          paused: false,
          counts: [],
          createdAt: null,
          updatedAt: null,
          user: null,
          id: null
        }
      }


      res.json({ inventory: newinventory })

    } catch (error) {
      next(error)
    }
  }

  static getAll = async (req: RequestExt, res: Response, next: NextFunction) => {

    const { page, size, search, almacen } = req.query;

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
      const inventory = await deleteInventoryCount({ inventoryId: id, countId })

      res.json({ inventory })

    } catch (error) {
      next(error)
    }

  }


}