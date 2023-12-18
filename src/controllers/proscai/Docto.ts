import { NextFunction, Response } from "express"
import { DoctoModel } from "../../models/proscai/Docto"



interface RequestExt {
  params: { supplierId: string }
}

export class DoctoController {

  static getBySupplier = async (req: RequestExt, res: Response, next: NextFunction) => {
    const { supplierId } = req.params

    const doctos = await DoctoModel.getBySupplier({ supplierId })

    res.json({ doctos })
  }

}