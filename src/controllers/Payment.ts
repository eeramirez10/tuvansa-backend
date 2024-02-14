import { NextFunction, Request, Response } from 'express'
import { PaymentModel } from '../models/Payment'
import { type PaymenttBody } from '../interfaces/payment'
import { ObjectId } from 'mongoose';
import { createNewPayment, updatePayment } from '../services/payment';

interface RequesExt extends Request {
  userId: ObjectId;
  body: PaymenttBody
}


export class PaymentController {
  static create = async (req: RequesExt, res: Response, next: NextFunction) => {

    const userId = req.userId

    try {
      const {
        idProscai,
        category,
        supplier,
        creditor,
        coin,
        datePaid,
        amount,
        branchOffice,
        subCategory

      } = req.body as PaymenttBody

      

      const { payment, error } = await createNewPayment({
        idProscai,
        branchOffice,
        category,
        coin,
        amount,
        datePaid,
        subCategory,
        userId: userId,
        supplier,
        creditor
      })


      return res.json({ payment })


    } catch (error) {
      next(error)
    }
  }

  static getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await PaymentModel.getAll()

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

  static update = async ({ params, body, userId }: RequesExt, res: Response, next: NextFunction) => {
    const id = params.id as string


    const {
      idProscai,
      category,
      supplier,
      creditor,
      coin,
      datePaid,
      amount,
      branchOffice

    } = body as PaymenttBody

    const { payment, error } = await updatePayment({ input: { ...body, userId }, id })

    try {
      // const payment = await PaymentModel.update({ id, input: updatedPayment })

      res.status(201).json({payment})

    } catch (error) {
      next(error)
    }


  }
}
