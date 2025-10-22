import type { NextFunction, Request, Response } from "express";
import { CreditorModel } from "../../models/proscai/Creditor";

export class CreditorController {
  static getByName = async (req: Request, res: Response, next: NextFunction) => {
    const search = req.query.search as string | undefined | null

    const creditors = await CreditorModel.getByName({ name: search })

    res.json({ creditors })
  }

}