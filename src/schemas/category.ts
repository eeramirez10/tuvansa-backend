import { Schema, ObjectId } from 'mongoose';
import { Category } from "../interfaces/category";
import mongooseUniqueValidator from 'mongoose-unique-validator'

export const categorySchema = new Schema<Category>({
  name: { type: Schema.Types.String, required: true, unique: true },
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subcategory'
    }
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