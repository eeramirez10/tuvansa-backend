import { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { IPayment, Paymentt } from '../interfaces/payment'

export const paymenttSchema = new Schema<Paymentt>({
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  doctos: [{
    type: Schema.Types.ObjectId,
    ref: 'Docto',
    required: true
  }],

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

paymenttSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

paymenttSchema.plugin(mongooseUniqueValidator)