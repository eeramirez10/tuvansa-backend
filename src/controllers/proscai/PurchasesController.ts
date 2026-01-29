import { Request, Response } from "express";
import { PurchaseModel } from "../../models/proscai/PurchaseModel";


export class PurchasesController {

  static getPurchases = async (req: Request, res: Response) => {


    const from = req.query.from as string
    const to = req.query.to as string
    const search = req.query.search as string
    const limit = req.query.limit ? +req.query.limit : undefined
    const page = req.query.page ? +req.query.page : undefined
    try {

      const purchaseOrders = await PurchaseModel.getPurchaseOrders({ from, to, search, limit, page })

      res.json({ results: purchaseOrders })

    } catch (error) {
      console.log(error)

      res.status(500).json({ error: 'Hubo un error, hablar con el admin' })
    }

  }
}