import { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import { BranchOffice, BranchOfficeCode, Inventory } from '../interfaces/inventory.interface'

export const inventorySchema = new Schema<Inventory>({
  iseq: { type: String, required: true, unique: true },
  cod: { type: String, required: true, unique: true },
  ean: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  quantity: { type: String, required: true },
  paused: { type: Boolean, required: true, default: false },
  counts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Count'
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  branchOffice: {
    name: { type: Schema.Types.String, enum: BranchOffice, required: true },
    code: { type: String, enum: BranchOfficeCode, required: true}
  }
}, {
  timestamps: true
})

inventorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

inventorySchema.plugin(mongooseUniqueValidator)