import { ObjectId, model } from 'mongoose'
import { paymentSchema } from '../schemas/payment'
import { IPayment, PaymentId } from '../interfaces/payment';


const Payment = model<IPayment>('Payment', paymentSchema)

export class PaymentModel {
  static create = async ({ input }: { input: IPayment }) => {

    const payment = await Payment.create(input)
    return payment
  }

  static getAll = async () => {

    try {
      const payments = Payment.find({})
        .populate('supplier')
        .populate('creditor')
        .populate('proscai')
        .populate('files')

      return payments

    } catch (error) {
      console.log(error)
    }

  }

  static getById = async ({ id }: { id: string }) => {

    try {

      return await Payment.findById(id)
        .populate('files', { payment: 0 })
        .populate('supplier')
        .populate('creditor')
        .populate('proscai')
        .populate('files')


    } catch (error) {
      console.log(error)
    }

  }

  static findOne = async ({ input }: { input: string }) => {

    const payment = await Payment.findOne({ idProscai: input })

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
