import { NextFunction, Request, Response } from "express";
import { ProscaiInventoryModel } from "../../models/proscai/Inventory";


interface RequestExt extends Request {
  query: { page: string, size: string, search: string, almacen: string }
  params: { iseq: string, cod:string, almacen: string }
}

export class ProscaiInventoryController {

  static getList = async (req: RequestExt, res: Response, next: NextFunction) => {

    const { page, size, search, almacen } = req.query;

    try {
      const inventories = await ProscaiInventoryModel.getList({ page, size, search, almacen })

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

  static getUbication = async (req: RequestExt, res: Response, next: NextFunction) => {
    const { cod } = req.params

    try {
      const ubications = await ProscaiInventoryModel.getUbication({ icod: cod})

      res.json({ ubications })
    } catch (error) {
      next(error)
    }
  }
}