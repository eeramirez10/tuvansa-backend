import { Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { Subcategory } from "../interfaces/subcategory.interface";


export const subcategorySchema = new Schema<Subcategory>({
  name: { type: Schema.Types.String  },
  category: { type: Schema.Types.ObjectId, ref: "Category" }
}, {
  timestamps: true
})

subcategorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

subcategorySchema.plugin(mongooseUniqueValidator)
