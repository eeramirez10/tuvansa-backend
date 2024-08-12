import { Request, Response, NextFunction } from "express"
import { ObjectId } from "mongoose"
import { SalesProscaiModel } from "../models/proscai/SalesModel"
import { Remission } from "../interfaces/remission"
import { RemissionModel } from "../models/Remission"

interface ReqExt extends Request {
  userId: ObjectId
}


export class SalesController {

  static create = async (req: ReqExt, res: Response, next: NextFunction) => {
    const body = req.body
    const idProscai = parseInt(req.params.id)
    const user = req.userId

    const {
      DSEQ,
      DFECHA,
      DNUM,
      DREFER,
      CLIENTE,
      IMPORTE,
      AGDESCR,
    } = await SalesProscaiModel.getRemission(idProscai)


    const remissonDB = await RemissionModel.getOne({ proscai: DSEQ.toString() })

    if (remissonDB !== null) {

      return res.status(400).json({ msg: 'Remission alredy in DB' })
    }

    const remissionObj: Remission = {
      proscai: DSEQ.toString(),
      dateProscai: DFECHA,
      remission: DNUM,
      order: DREFER,
      customer: CLIENTE,
      amount: IMPORTE,
      agent: AGDESCR,
      authorized: false,
      file: null,
      user,
      authorizedBy: null,
    }

    try {
      const remission = await RemissionModel.create(remissionObj)
      res.json({ remission })
    } catch (error) {
      next(error)
    }
  }

  static getById = async (req: ReqExt, res, next) => {
    const id = req.params.id

    try {
      const remission = await RemissionModel.getById(id)
      res.json({ remission })
    } catch (error) {
      next(error)
    }
  }

  static getAll = async (req: ReqExt, res, next) => {

    try {
      const remissions = await RemissionModel.getAll()

      res.json({ remissions })

    } catch (error) {
      next(error)
    }

  }

  static update = async (req: ReqExt, res: Response, next: NextFunction) => {
    const body = req.body
    const id = req.params.id
    
    try {

      const isRemission = await RemissionModel.getById(id)

      if(!isRemission) return res.status(400).json({ msg: 'Remission not exist'})

      const remission = await RemissionModel.update(id, body)

      res.json({ remission })

      console.log(remission)

    } catch (error) {
      next(error)
    }
  }

}