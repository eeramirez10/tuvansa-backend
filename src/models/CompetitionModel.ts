import { model } from 'mongoose';
import { EfectoComprobanteValues, type Competition as ICompetition } from '../interfaces/competition.interface';
import { competitionSchema } from '../schemas/competition';


const Competition = model<ICompetition>('Competition', competitionSchema)

export class CompetitionModel {

  static getAll = async () => {
    const competition = await Competition.aggregate([
      {
        $project: {
          RfcEmisor: 1,
          NombreRazonSocialEmisor: 1
        }
      }, {
        $group: {
          _id: { RfcEmisor: "$RfcEmisor" },
          NombreRazonSocialEmisor: { $addToSet: "$NombreRazonSocialEmisor" }
        }
      }, {
        $project: {
          _id: 0,
          RfcEmisor: "$_id.RfcEmisor",
          NombreRazonSocialEmisor: { $arrayElemAt: ["$NombreRazonSocialEmisor", 0] },
        }
      }
    ])

    return competition
  }

  static getByRfcEmisor = async ({ RfcEmisor = "", EfectoComprobante = "Ingreso" }: { RfcEmisor?: string, EfectoComprobante?: EfectoComprobanteValues }) => {

    console.log(RfcEmisor)
    const competition = await Competition.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$FechaEmision" }, 2023]
          },
          RfcEmisor,
          EfectoComprobante,
          EstadoComprobante: "Vigente"
        }
      },
      {
        $project: {
          mes: { $month: "$FechaEmision" },
          anio: { $year: "$FechaEmision" },
          EfectoComprobante: 1,
          Total: 1,
          Subtotal: 1,
          RfcEmisor: 1,
          NombreRazonSocialEmisor: 1,
        }
      },
      {
        $group: {
          _id: { mes: "$mes", RfcEmisor: "$RfcEmisor", anio: "$anio" },
          NombreRazonSocialEmisor: { $addToSet: "$NombreRazonSocialEmisor" },
          EfectoComprobante: { $addToSet: "$EfectoComprobante" },
          totalPorMes: { $sum: "$Total" },
          subTotalPorMes: { $sum: "$Subtotal" }

        }
      },
      {
        $project: {
          _id: 0,
          mes: "$_id.mes",
          anio: "$_id.anio",
          RfcEmisor: "$_id.RfcEmisor",
          EfectoComprobante: { $first: "$EfectoComprobante" },
          NombreRazonSocialEmisor: { $first: "$NombreRazonSocialEmisor" },
          totalPorMes: 1,
          subTotalPorMes: 1
        }
      },
      {
        $sort: { mes: 1 }
      },
      {
        $group: {
          _id: { RfcEmisor: "$RfcEmisor", anio: "$anio" },
          NombreRazonSocialEmisor: { $first: "$NombreRazonSocialEmisor" },
          ingresos: { $push: { subTotalPorMes: "$subTotalPorMes", totalPorMes: "$totalPorMes", mes: "$mes", EfectoComprobante: "$EfectoComprobante" } }
        }
      },
      {
        $project: {
          _id: 0,
          RfcEmisor: "$_id.RfcEmisor",
          anio: "$_id.anio",
          NombreRazonSocialEmisor: 1,
          ingresos: 1
        }
      }
      // {
      //   $project: {
      //     _id: 0,
      //     RfcEmisor: "$_id",
      //     NombreRazonSocialEmisor:  { $arrayElemAt: ["$NombreRazonSocialEmisor", 0] },
      //     ingresos: {
      //       $filter: {
      //         input: "$ventas",
      //         cond: { $eq: ["$$this.EfectoComprobante", "Ingreso"] }
      //       }
      //     },
      //     egresos: {
      //       $filter: {
      //         input: "$ventas",
      //         cond: { $eq: ["$$this.EfectoComprobante", "Egreso"] }
      //       }
      //     },
      //     pagos:{
      //       $filter:{
      //         input: "$ventas",
      //         cond: { $eq: ["$$this.EfectoComprobante", "Pago"] }
      //       }
      //     },
      //     nominas:{
      //       $filter:{
      //         input: "$ventas",
      //         cond: { $eq: ["$$this.EfectoComprobante", "Nómina"] }
      //       }
      //     },
      //     traslados: {
      //       $filter:{
      //         input: "$ventas",
      //         cond: { $eq: ["$$this.EfectoComprobante", "Traslado"] }
      //       }
      //     }
      //   }
      // }
    ])



    return competition[0]
  }

  static getCustomers = async ({ RfcEmisor = "" }: { RfcEmisor?: string }) => {



    return await Competition.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$FechaEmision" }, 2023]
          },
          RfcEmisor,
          EfectoComprobante: "Ingreso",
          EstadoComprobante: "Vigente"
        }
      },
      {
        '$project': {
          'RfcReceptor': '$RfcReceptor',
          'NombreRazonSocialReceptor': '$NombreRazonSocialReceptor',
          'EstadoComprobante': '$EstadoComprobante',
          'EfectoComprobante': '$EfectoComprobante',
          'anio': {
            '$year': '$FechaEmision'
          },
          mes: { $month: "$FechaEmision" },
          'Total': 1,
          'Subtotal': 1
        }
      }, {
        '$group': {
          '_id': {
            'anio': '$anio',
            'RfcReceptor': '$RfcReceptor',
          },
          'NombreRazonSocialReceptor': {
            '$addToSet': '$NombreRazonSocialReceptor'
          },
          'EstadoComprobante': {
            '$addToSet': '$EstadoComprobante'
          },
          'EfectoComprobante': {
            '$addToSet': '$EfectoComprobante'
          },
          'totalPorAnio': {
            '$sum': '$Total'
          },
          'subTotalPorAnio': {
            '$sum': '$Subtotal'
          }
        }
      }, {
        '$project': {
          '_id': 0,
          'anio': '$_id.anio',
          'RfcReceptor': '$_id.RfcReceptor',
          'NombreRazonSocialReceptor': {
            '$arrayElemAt': [
              '$NombreRazonSocialReceptor', 0
            ]
          },
          'EstadoComprobante': {
            '$arrayElemAt': [
              '$NombreRazonSocialReceptor', 0
            ]
          },
          'EfectoComprobante': {
            '$arrayElemAt': [
              '$EfectoComprobante', 0
            ]
          },
          'totalPorAnio': '$totalPorAnio',
          'subTotalPorAnio': '$subTotalPorAnio'
        }
      }, {
        '$sort': {
          'subTotalPorAnio': -1
        }
      }, {
        $limit: 20
      }
    ])
  }
}


