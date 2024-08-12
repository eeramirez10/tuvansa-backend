import { Schema } from "mongoose"
import { PurchaseOrder } from "../interfaces/purchase-order"

export const purchaseOrderSchema = new Schema<PurchaseOrder>({

  proscai:{
    type: String,
    required: [true, 'proscai is required']
  },
  provider:{
    type: String,
    required: [true, 'provider is required']
  },
  purchaseOrder:{
    type: String,
    required: [true, 'purchaseOrder is required']
  },
  pedPrv:{
    type: String,
    required: [true, 'pedPrv is required']
  },
  from:{
    type: Date,
    required: [true, 'from is required']
  },
  due:{
    type: Date,
    required: [true, 'due is required']
  },
  warehouse:{
    type: String,
    required: [true, 'warehouse is required']
  },
  captureDate:{
    type: Date,
    required: [true, 'captureDate is required']
  },
  pcs:{
    type: String,
    required: [true, 'pcs is required']
  },
  amount:{
    type: String,
    required: [true, 'amount is required']
  },
  currency:{
    type: String,
    required: [true, 'currency is required']
  },
  exchangeRate:{
    type: String,
    required: [true, 'exchangeRate is required']
  },
  comment:{
    type: String
  },
  authorized: { type: Boolean, default: false },
  authorizedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  file: { type: Schema.Types.ObjectId, ref: 'File' },
  signedFile: { type: Schema.Types.ObjectId, ref: 'File' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
})

purchaseOrderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
