import { model } from "mongoose"
import { type Supplier as ISupplier } from '../interfaces/payment';
import { supplierSchema } from "../schemas/supplier";

const Supplier = model<ISupplier>('Supplier', supplierSchema)

export class SupplierModel {
  static create = async ({ input }: { input: ISupplier }): Promise<ISupplier> => {
    const { idProscai, name } = input
    let supplier = await Supplier.findOne({ idProscai })
    
    if (supplier === null || supplier === undefined) {
      let newSupplier = await Supplier.create({ name, idProscai })
      return newSupplier
    }

    return supplier
  }
}