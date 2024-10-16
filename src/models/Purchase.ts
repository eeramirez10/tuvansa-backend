import { model } from 'mongoose';
import { purchaseOrderSchema } from '../schemas/purchaseOrders';
import { PurchaseOrder } from '../interfaces/purchase-order';

const PurchaseOrder = model<PurchaseOrder>('PurchaseOrders', purchaseOrderSchema)


export class PurchaseModel {


  static createOrder = (object: PurchaseOrder) => {


    return PurchaseOrder.create(object)

  }

  static getOrderById(id: string) {
    return PurchaseOrder.findById(id)
      .populate('file')
      .populate('user')
      .populate({ path: 'authorizedBy' })
  }

  static getAllOrders() {
    return PurchaseOrder.find({})
      .populate('file')
      .populate('user')
      .populate({ path: 'authorizedBy' })
  }

  static getOneOrder = async (value: object) => {
    return await PurchaseOrder.findOne(value)
  }

  static updateOrder = async (id: string, object: PurchaseOrder) => {
    return await PurchaseOrder.findByIdAndUpdate(id, { ...object }, { new: true })
  }
}