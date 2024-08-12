import { Request, Response, NextFunction } from "express";
import { CustomerModel } from "../../models/proscai/Customer";

export class CustomerController {
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    const search = req.query.search as string | undefined | null

   const customers = await  CustomerModel.getAll({ search })

   res.json(customers)
  }
}