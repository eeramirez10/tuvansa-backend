import { Schema, } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { File } from '../interfaces/payment'


export const fileSchema = new Schema<File>({
  name: { type: String, required: true },
  originalName: { type: String, required: true },
  ext: { type: String, required: true },
  doc: {
    type: Schema.Types.ObjectId,
    refPath: 'docModel',
  },
  docModel: { type: String, enum: ["Payment", "Remission", "PurchaseOrders"] }
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