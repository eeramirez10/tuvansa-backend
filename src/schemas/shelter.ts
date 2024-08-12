import { Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { Shelter } from "../interfaces/shelter.interface";


export const shelterSchema = new Schema<Shelter>({  
  count: { type: Number, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  inventory: {
    iseq: { type: String },
    cod: { type: String },
    ean: { type: String },
    quantity: { type: Number },
    description: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  warehouse:{
    code:{ type: String, required: true},
    name:{ type: String }
  }

}, {
  timestamps: true
})

shelterSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

shelterSchema.plugin(mongooseUniqueValidator)