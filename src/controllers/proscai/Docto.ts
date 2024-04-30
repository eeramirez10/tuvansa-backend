import { NextFunction, Response } from "express"
import { DoctoProscaiModel } from "../../models/proscai/Docto"



interface RequestExt {
  params: { supplierId: string, paymentId: string },
  query: { page: string, size: string, search: string }
}

export class DoctoController {
  static getAll = async (req: RequestExt, res: Response, next: NextFunction) => {

    const { page, size, search } = req.query;
    try {
      const doctos = await DoctoProscaiModel.getAll({ page, size, search })

      res.json({ doctos })
    } catch (error) {
      next(error)
    }
  }

  static getById = async ({ params }: RequestExt, res: Response, next: NextFunction) => {
    const paymentId = params.paymentId

    try {

      const docto = await DoctoProscaiModel.getById({ id: paymentId })

      res.json({ docto })

    } catch (error) {
      next(error)
    }
  }

  static getBySupplier = async (req: RequestExt, res: Response, next: NextFunction) => {
    const { supplierId } = req.params

    const doctos = await DoctoProscaiModel.getBySupplier({ supplierId })

    res.json({ doctos })
  }

}