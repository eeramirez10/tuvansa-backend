import { Request, NextFunction, Response } from "express";
import { CountModel } from "../models/Count";
import { type ObjectId } from "mongoose";
import { deleteCount } from "../services/count";


export class CountController {
  static delete = async (req: Request, res: Response, next: NextFunction) => {

    const inventoryId = req.params.inventoryId as string
    const countId = req.params.countId as string

    try {
      const count = await deleteCount({ inventoryId, countId})

      res.json({ count })
      
    } catch (error) {
      next(error)
    }



  }
}