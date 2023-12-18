import type { NextFunction, Request, Response } from "express";
import { SupplierModel } from "../../models/proscai/Supplier";


export class SupplierController {
  static getByName = async (req: Request, res: Response, next: NextFunction) => {
    const search = req.query.search as string | undefined | null

    const suppliers = await SupplierModel.getByName({ search })

    res.json({suppliers})
  }

}