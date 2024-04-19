
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
    const year = req.query.year as string

    try {

      const competition = await CompetitionModel.getByRfcEmisor({ RfcEmisor, EfectoComprobante, year })
      res.json({ competition })
    } catch (error) {
      next(error)
    }
  }

  static getCustomersByEmisor = async (req: Request, res: Response, next: NextFunction) => {
    const RfcEmisor = req.params.RfcEmisor as string
    const EfectoComprobante = req.query.EfectoComprobante as EfectoComprobanteValues
    const year = req.query.year as string

    try {

      const customers = await CompetitionModel.getCustomers({ RfcEmisor, EfectoComprobante, year })
      res.json({ customers })
    } catch (error) {
      next(error)
    }
  }

  static getRecibidasByRfcReceptor =async (req: Request, res: Response, next: NextFunction) => {
    const RfcReceptor = req.params.RfcReceptor as string
    const EfectoComprobante = req.query.EfectoComprobante as EfectoComprobanteValues
    const year = req.query.year as string

    console.log(RfcReceptor)

    try {

      const customers = await CompetitionModel.getRecibidasByRfcReceptor({ RfcReceptor, EfectoComprobante, year })
      res.json({ customers })
    } catch (error) {
      next(error)
    }

  }

  static getRecibidasByRfcEmisor = async (req: Request, res: Response, next: NextFunction) => {
    const RfcEmisor = req.params.RfcEmisor as string
    const EfectoComprobante = req.query.EfectoComprobante as EfectoComprobanteValues
    const year = req.query.year as string

    try {

      const customers = await CompetitionModel.getRecibidasByRfcEmisor({ RfcEmisor, EfectoComprobante, year })
      res.json({ customers })
    } catch (error) {
      next(error)
    }
  }
}