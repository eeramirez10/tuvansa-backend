import { NextFunction, Request, Response } from "express";
import { PaymentModel } from "../models/Payment";


export class FileController {
  static upload = async (req: any, res: Response, next: NextFunction) => {


    const { paymentId } = req.params


    console.log(paymentId)

    res.json({ ok: true })

  }
}