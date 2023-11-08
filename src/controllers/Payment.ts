import { NextFunction, Request, Response } from 'express'
import { PaymentModel } from '../models/Payment'

export class PaymentController {
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        supplier,
        docto,
        amount = 0,
        comments = ''
      } = req.body

      const newPayment = {
        supplier,
        docto,
        amount,
        comments
      }

      const paymentDB = await PaymentModel.create({ input: newPayment })

      return res.json(paymentDB)
    } catch (error) {
      next(error)
    }
  }

  static getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await PaymentModel.getAlL()

      return res.json(payments)
    } catch (error) {
      next(error)
    }
  }
}
