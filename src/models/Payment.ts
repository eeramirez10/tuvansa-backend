import { ObjectId, model } from 'mongoose'
import { paymentSchema } from '../schemas/payment'
import { File, IPayment, PaymentId } from '../interfaces/payment';


const Payment = model<IPayment>('Payment', paymentSchema)

export class PaymentModel {
  static create = async ({ input }: { input: IPayment }) => {

    const payment = await Payment.create(input)
    return payment
  }

  static getAlL = async () => {
    const payments = Payment.find({})
      .populate('files', {
        payment: 0
      })
      .populate('supplier')

    return payments
  }

  static getById = async ({ id }: { id: string }) => {

    console.log(id)
    const payment = await Payment.findById(id)
      .populate('files', { payment: 0 })
      .populate('supplier')

    return payment
  }

  static update = async ({ input, id }: { input: IPayment, id: string }) => {
    const payment = await Payment.findByIdAndUpdate(id, input)

    return payment
  }

  static addFiles = async ({ paymentId, file }: { paymentId: PaymentId, file: ObjectId }) => {

    try {

      const payments = await Payment.findById(paymentId)

      if (payments) {

        payments.files = payments?.files?.concat(file)

        await payments.save()
      }

      return payments

    } catch (error) {
      console.log(error)
    }

  }
}
