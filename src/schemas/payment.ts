import { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { IPayment } from '../interfaces/payment'

export const paymentSchema = new Schema<IPayment>({
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  docto: { type: String, required: true },
  paid: { type: Number },
  comments: { type: String },
  datePaid: { type: Date, required: true },
  files: [{
    type: Schema.Types.ObjectId,
    ref: 'File'
  }]
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
