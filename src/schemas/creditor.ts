import { Schema, type ObjectId } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { Creditor } from '../interfaces/creditor.interface';


export const creditorSchema = new Schema<Creditor>({
  uid:{ type: Schema.Types.String, required: true},
  name: { type: Schema.Types.String, required: true},
},{
  timestamps: true
})

creditorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

creditorSchema.plugin(mongooseUniqueValidator)