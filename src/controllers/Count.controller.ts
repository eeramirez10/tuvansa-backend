import { Request, NextFunction, Response } from "express";
import {  deleteInventoryCount } from "../services/count";


export class CountController {
  static delete = async (req: Request, res: Response, next: NextFunction) => {

    const inventoryId = req.params.inventoryId as string
    const countId = req.params.countId as string

    try {
      const count = await deleteInventoryCount({ inventoryId, countId})

      res.json({ count })
      
    } catch (error) {
      next(error)
    }



  }
}