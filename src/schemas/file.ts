import { Schema, } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { File } from '../interfaces/payment'
import { DOC_MODELS } from '../dtos/file.dto';


export const fileSchema = new Schema<File>({
  name: { type: String, required: true },
  originalName: { type: String, required: true },
  ext: { type: String, required: true },
  doc: {
    type: Schema.Types.ObjectId,
    refPath: 'docModel',
  },
  docModel: { type: String, enum: DOC_MODELS }
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