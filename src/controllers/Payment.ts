import { NextFunction, Request, Response } from 'express'
import { PaymentModel } from '../models/Payment'
import { SupplierModel } from '../models/SupplierModel'
import { RequestExt } from '../interfaces/request.interface';
import { PaymentBody } from '../interfaces/payment'
import { ObjectId } from 'mongoose';

interface RequesExt extends Request {
  userId: ObjectId;
  body: PaymentBody

}

export class PaymentController {
  static create = async (req: RequesExt, res: Response, next: NextFunction) => {

    const userId = req.userId
    try {
      const {
        docto,
        paid = 0,
        comments = '',
        datePaid,
        supplier
      } = req.body

      const supplierDB = await SupplierModel.create({ input: supplier })

      const newPayment = {
        supplier: supplierDB.id,
        docto,
        paid,
        comments,
        datePaid,
        user: userId
      }

      const paymentDB = await PaymentModel.create({ input: newPayment })

      return res.json({ payment: paymentDB })
    } catch (error) {
      next(error)
    }
  }

  static getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await PaymentModel.getAlL()

      return res.json({ payments })
    } catch (error) {
      next(error)
    }
  }

  static getById = async ({ params }: Request, res: Response, next: NextFunction) => {
    const paymentId = params.paymentId

    try {

      const payment = await PaymentModel.getById({ id: paymentId })

      res.json({ payment })

    } catch (error) {
      next(error)
    }
  }

  static update = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    const {
      docto,
      paid = 0,
      comments = '',
      datePaid,
      idProscai,
      supplierName
    } = req.body

    const supplier = await SupplierModel.create({ input: { name: supplierName, idProscai } })

    const updatedPayment = {
      docto,
      paid,
      comments,
      datePaid,
      idProscai,
      supplier: supplier.id
    }

    try {
      const payment = await PaymentModel.update({ id, input: updatedPayment })

      res.status(201).json({ payment })

    } catch (error) {
      next(error)
    }


  }
}
