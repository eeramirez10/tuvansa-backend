import { model } from 'mongoose'
import { paymentSchema } from '../schemas/payment.js'

const Payment = model('Payment', paymentSchema)

export class PaymentModel {
  static create = async ({ input }) => {
    const payment = await Payment.create(input)
    return payment
  }

  static getAlL = async () => {
    const payments = Payment.find({})
    return payments
  }
}
