import { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { Count } from '../interfaces/inventory.interface'

export const countSchema = new Schema<Count>({
  count: { type: Number, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

countSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

countSchema.plugin(mongooseUniqueValidator)