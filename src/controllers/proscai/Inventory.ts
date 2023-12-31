import { NextFunction, Request, Response } from "express";
import { ProscaiInventoryModel } from "../../models/proscai/Inventory";


interface RequestExt extends Request {
  query: { page: string, size: string, search: string }
  params: { iseq: string }
}

export class ProscaiInventoryController {

  static getList = async (req: RequestExt, res: Response, next: NextFunction) => {

    const { page, size, search } = req.query;

    console.log(typeof search)

    try {
      const inventories = await ProscaiInventoryModel.getList({ page, size, search })

      res.json({ inventories })

    } catch (error) {
      next(error)
    }


  }

  static getByIseq = async (req: RequestExt, res: Response, next: NextFunction) => {
    const { iseq } = req.params

    try {
      const inventory = await ProscaiInventoryModel.getByIseq({ iseq })

      res.json({ inventory })
      
    } catch (error) {
      next(error)
    }


  }
}