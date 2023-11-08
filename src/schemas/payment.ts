import { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { IPayment } from '../interfaces/payment'

export const paymentSchema = new Schema<IPayment>({
  supplier: {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true }
  },
  docto: { type: String, required: true },
  amount: { type: Number },
  comments: { type: String },
  files: [{
    type: Schema.Types.ObjectId,
    ref: 'file'
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
