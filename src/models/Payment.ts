import { model } from 'mongoose'
import { paymentSchema } from '../schemas/payment'
import { IPayment } from '../interfaces/payment'

const Payment = model<IPayment>('Payment', paymentSchema)

export class PaymentModel {
  static create = async ({ input } : { input: IPayment }) => {
    const payment = await Payment.create(input)
    return payment
  }

  static getAlL = async () => {
    const payments = Payment.find({})

    return payments
  }
}
