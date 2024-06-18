import { Schema, type ObjectId } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { type Docto } from "../interfaces/docto.interface";


export const doctoSchema = new Schema<Docto>({
  idProscai: { type: Schema.Types.String },
  factura: { type: Schema.Types.String },
  ordenCompra: { type: Schema.Types.String },
  supplierFactura: { type: Schema.Types.String },
  importePesos: { type: Schema.Types.String },
  importeFactura: { type: Schema.Types.String },
  saldo: { type: Schema.Types.String },
  tipoCambio: { type: Schema.Types.String },
  fecha: { type: Schema.Types.String },
  supplier: {
    uid: { type: Schema.Types.String },
    name: { type: Schema.Types.String }
  },
  branchOffice: {
    code: { type: Schema.Types.String },
    name: { type: Schema.Types.String }
  },
  coin: {
    name: { type: Schema.Types.String },
    code: { type: Schema.Types.String },
  }
},{
  timestamps: true
})


doctoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

doctoSchema.plugin(mongooseUniqueValidator)