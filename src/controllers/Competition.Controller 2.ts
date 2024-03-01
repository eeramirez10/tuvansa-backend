
import { Request, NextFunction, Response } from "express";
import { CompetitionModel } from "../models/CompetitionModel";
import { EfectoComprobanteValues } from "../interfaces/competition.interface";


export class CompetitionController {
  static get = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const competitions = await CompetitionModel.getAll()


      res.json({ competitions })

    } catch (error) {
      next(error)
    }

  }

  static getByRfcEmisor = async (req: Request, res: Response, next: NextFunction) => {
    const RfcEmisor = req.params.RfcEmisor as string
    const EfectoComprobante = req.query.EfectoComprobante as EfectoComprobanteValues

    console.log(EfectoComprobante)

    try {

      const competition = await CompetitionModel.getByRfcEmisor({ RfcEmisor, EfectoComprobante })
      res.json({ competition })
    } catch (error) {
      next(error)
    }
  }

  static getCustomersByEmisor = async (req: Request, res: Response, next: NextFunction) => {
    const RfcEmisor = req.params.RfcEmisor as string

    try {

      const customers = await CompetitionModel.getCustomers({ RfcEmisor })
      res.json({ customers })
    } catch (error) {
      next(error)
    }
  }
}