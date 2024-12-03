import { NextFunction, Request, Response } from "express";
import { ProscaiInventoryModel } from "../../models/proscai/Inventory";
import { stringToBoolean } from "../../helpers/stringToBoolean";


interface RequestExt extends Request {
  query: { page: string, size: string, search: string, almacen: string, withStock: string, family: string }
  params: { iseq: string, cod: string, almacen: string, almseq: string }
}

export class ProscaiInventoryController {

  static getList = async (req: RequestExt, res: Response, next: NextFunction) => {

    const { page, size, search, almacen, withStock: stock ,family } = req.query;

    const withStock = stock ? stringToBoolean(stock) : false;

    try {
      const inventories = await ProscaiInventoryModel.getList({ page, size, search, almacen, withStock, family })

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

  static getShelter = async (req: RequestExt, res: Response, next: NextFunction) => {
    const { almseq } = req.params

    try {
      const shelter = await ProscaiInventoryModel.getShelter({ almseq })

      res.json({ shelter })
    } catch (error) {
      next(error)
    }
  }
}