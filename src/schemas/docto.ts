import { Schema, type ObjectId } from 'mongoose';
import { type Docto } from "../interfaces/docto.interface";
import mongooseUniqueValidator from 'mongoose-unique-validator';

const { ObjectId, Number, } = Schema.Types;

export const doctoSchema = new Schema<Docto>({
  name: { type: String, required: true, unique: true },
  references: {required: true, type: String},
  dateProscai: {required: true, type: Date},
  amount: {required: true, type: Number },
  balance: {required: true, type: Number  },
  paid: {required: true, type: Number  },
  file: { type: ObjectId },
  supplier: {required: true, type: ObjectId },
},{
  timestamps: true
})


doctoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

doctoSchema.plugin(mongooseUniqueValidator)