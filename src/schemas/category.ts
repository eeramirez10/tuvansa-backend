import { Schema } from "mongoose";
import { Category } from "../interfaces/category";
import mongooseUniqueValidator from 'mongoose-unique-validator'

export const categorySchema = new Schema<Category>({
  name: { type: Schema.Types.String, required: true },
  subcategories: [
    { name: { type: Schema.Types.String, required: true, unique: true }, }
  ]
}, {
  timestamps: true
})

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

categorySchema.plugin(mongooseUniqueValidator)