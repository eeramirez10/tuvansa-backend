import { Schema, ObjectId } from 'mongoose';
import { Remission } from "../interfaces/remission";

export const remissionSchema = new Schema<Remission>({
  proscai: {
    type: String,
    required: [true, 'proscai is required']
  },
  dateProscai: {
    type: String,
    required: [true, 'dateProscai is required']
  },
  remission: { type: String, required: [true, 'remission is required'] },
  order: { type: String, required: [true, 'order is required'] },
  references: { type: String },
  customer: { type: String, required: [true, 'customer is required'] },
  amount: { type: String, required: [true, 'amount is required'] },
  agent: { type: String, required: [true, 'agent is required'] },
  authorized: { type: Boolean, default: false },
  authorizedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  file: { type: Schema.Types.ObjectId, ref: 'File' },
  signedFile: { type: Schema.Types.ObjectId, ref: 'File' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
})

remissionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
