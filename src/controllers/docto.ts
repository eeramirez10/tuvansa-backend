import { NextFunction, Request, Response } from "express"
import { Docto } from "../interfaces/docto.interface"
import { DoctoModel } from "../models/Docto"
import { SupplierModel } from "../models/SupplierModel"

export class DoctoController {

  static create = async (req: Request, res: Response, next: NextFunction) => {


    const docto = req.body

    const doctoDB = await DoctoModel.create({ docto })

    res.json(doctoDB)

  }


}