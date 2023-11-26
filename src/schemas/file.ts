import { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { File } from '../interfaces/payment'


export const fileSchema = new Schema<File>({
  name: { type: String, required: true },
  ext: { type: String, required: true },
  payment: {
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }
},
{
  timestamps: true
})

fileSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

fileSchema.plugin(mongooseUniqueValidator)