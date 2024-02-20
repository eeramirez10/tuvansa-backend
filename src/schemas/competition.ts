import { Schema } from "mongoose";
import { type Competition } from "../interfaces/competition.interface";
import mongooseUniqueValidator from "mongoose-unique-validator";


export const competitionSchema = new Schema<Competition>({
  id: { type: Schema.Types.String },
  FolioFiscal: { type: Schema.Types.String },
  RfcEmisor: { type: Schema.Types.String },
  NombreRazonSocialEmisor: { type: Schema.Types.String },
  RfcReceptor: { type: Schema.Types.String },
  NombreRazonSocialReceptor: { type: Schema.Types.String },
  FechaEmision: { type: Schema.Types.Date },
  FechaCertificacion: { type: Schema.Types.Date },
  Subtotal: { type: Schema.Types.Number },
  Total: { type: Schema.Types.Number },
  EstadoComprobante: { type: Schema.Types.String },
  EfectoComprobante: { type: Schema.Types.String },
  RfcPac: { type: Schema.Types.String },
  EstatusCancelacion: { type: Schema.Types.String },
})

competitionSchema.set('toJSON',{
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

competitionSchema.plugin(mongooseUniqueValidator)