import { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

export const paymentSchema = new Schema({
  supplier: {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true }
  },
  docto: { type: String, required: true },
  amount: { type: Number },
  comments: { type: String },
  files: [{
    id: Schema.Types.ObjectId,
    ref: 'file'
  }]
}, { timestamps: true })

paymentSchema.plugin(mongooseUniqueValidator)
