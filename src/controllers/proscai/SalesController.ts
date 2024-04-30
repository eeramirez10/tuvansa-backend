import { SalesModel } from "../../models/proscai/SalesModel"
import { Request, Response, NextFunction } from "express";


export class SalesController {

  static getSales = async (req: Request, res: Response, next: NextFunction) => {


    try {
      const sales = await SalesModel.getSales({})

      res.json({ results: sales })

    } catch (error) {
      next(error)
    }
  }
}