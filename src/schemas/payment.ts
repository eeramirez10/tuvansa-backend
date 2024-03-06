import { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { IPayment } from '../interfaces/payment'


const categories = [
  'mantenimiento',
  'gasolina',
  'viaticos',
  'maquila',
  'despensa',
  'vigilancia',
  'honorarios',
  'consultoria',
  'impuestos',
  'fumigacion',
  'servicios',
  'vales',
]

export const paymentSchema = new Schema<IPayment>({
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  creditor: {
    type: Schema.Types.ObjectId,
    ref: 'Creditor'
  },
  coin: {
    name: { type: Schema.Types.String, enum: ["pesos", "dolares"] },
    code: { type: Schema.Types.String, enum: ["MXN", "USD"] }
  },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  subcategory: { type: Schema.Types.ObjectId, ref: "Subcategory", required: true },
  amount: { type: Schema.Types.Number, default: null },
  datePaid: { type: Date, default: null },
  files: [{
    type: Schema.Types.ObjectId,
    ref: 'File'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  branchOffice: {
    type: String,
    required: true,
    enum: ["Mexico", "Monterrey", "Veracruz", "Mexicali", "Queretaro", "Cancun"]
  },
  proscai: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'Docto'
  }
}, {
  timestamps: true
})

paymentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

paymentSchema.plugin(mongooseUniqueValidator)
