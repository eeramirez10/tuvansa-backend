import { Request, Response } from "express";
import { PurchaseModel } from "../../models/proscai/PurchaseModel";


export class PurchasesController {

  static getPurchases = async (req: Request, res: Response) => {

    const from = req.query.from as string
    const to = req.query.to as string
    try {

      const purchaseOrders = await PurchaseModel.getPurchaseOrders({ from, to })

      res.json({ results: purchaseOrders })

    } catch (error) {
      console.log(error)

      res.status(500).json({ error: 'Hubo un error, hablar con el admin' })
    }

  }
}