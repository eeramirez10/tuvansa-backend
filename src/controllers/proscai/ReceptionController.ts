import { NextFunction, Request, Response } from "express";
import { ReceptionModel } from "../../models/proscai/ReceptionModel";

export class ReceptionController {
  static getList = async (req: Request, res: Response, next: NextFunction) => {

    const search = req.query.search as string

    const receptions = await ReceptionModel.getList({ search })

    res.json({ receptions })

  }
} 