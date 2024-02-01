import { NextFunction, Request, Response } from 'express'
import { PaymentModel } from '../models/Payment'
import {  type PaymenttBody } from '../interfaces/payment'
import { ObjectId } from 'mongoose';
import { createNewPayment } from '../services/payment';

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
        branchOffice
        
      } = req.body as PaymenttBody

      const { payment, error } = await createNewPayment({
        idProscai,
        branchOffice,
        category,
        coin,
        amount,
        datePaid,
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

  static update = async (req: Request, res: Response, next: NextFunction) => {

    // const { id } = req.params
    // const {
    //   docto,
    //   paid = 0,
    //   comments = '',
    //   datePaid,
    //   idProscai,
    //   supplierName
    // } = req.body

    // const supplier = await SupplierModel.create({ input: { name: supplierName, idProscai } })

    // const updatedPayment = {
    //   docto,
    //   paid,
    //   comments,
    //   datePaid,
    //   idProscai,
    //   supplier: supplier.id
    // }

    try {
      // const payment = await PaymentModel.update({ id, input: updatedPayment })

      res.status(201).json({})

    } catch (error) {
      next(error)
    }


  }
}
