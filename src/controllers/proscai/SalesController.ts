
import { Request, Response, NextFunction } from "express";
import { SalesProscaiModel } from "../../models/proscai/SalesModel";



export class SalesController {

  static getSales = async (req: Request, res: Response, next: NextFunction) => {


    try {
      const sales = await SalesProscaiModel.getSales({})

      res.json({ results: sales })

    } catch (error) {
      next(error)
    }
  }

  static getRemissions = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const remissions = await SalesProscaiModel.getRemissions()


      res.json({ results: remissions })
    } catch (error) {
      next(error)
    }
  }

  static getRemission = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)
    try {

      const remission = await SalesProscaiModel.getRemission(id)


      res.json({ result: remission })
    } catch (error) {
      next(error)
    }
  }
}