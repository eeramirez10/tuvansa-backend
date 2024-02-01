import { ObjectId, isObjectIdOrHexString, model } from 'mongoose'
import { paymentSchema } from '../schemas/payment'
import { File, IPayment, PaymentId } from '../interfaces/payment';
import { connection } from '../config/mysql'
import { BRANCH_OFFICE_VALUES_DMULTICIA } from '../helpers/branchOffice';

const COIN_VALUES = {
  1: {
    code: 'MXN',
    name: 'Pesos'
  },
  2: {
    code: 'USD',
    name: 'Dolares'
  }
}

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

      return payments

    } catch (error) {
      console.log(error)
    } finally {

    }



  }

  static getById = async ({ id }: { id: string }) => {

    const conexion = await connection()

    try {

      return await Payment.findById(id)
        .populate('files', { payment: 0 })
        .populate('supplier')


    } catch (error) {
      console.log(error)
    } finally {
      conexion.destroy()
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
