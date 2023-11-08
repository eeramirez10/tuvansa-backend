import { PaymentModel } from '../models/Payment.js'

export class PaymentController {
  static create = async (req, res, next) => {
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

  static getAll = async (req, res, next) => {
    try {
      const payments = await PaymentModel.getAlL()
      return res.json(payments)
    } catch (error) {
      next(error)
    }
  }
}
