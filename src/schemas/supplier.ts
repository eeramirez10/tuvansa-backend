import { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { Supplier } from '../interfaces/payment'

export const supplierSchema = new Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true }
}, {
  timestamps: true
})

supplierSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

supplierSchema.plugin(mongooseUniqueValidator)