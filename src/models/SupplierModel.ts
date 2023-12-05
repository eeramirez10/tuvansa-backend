import { model } from "mongoose"
import { SupplierId, type Supplier as ISupplier } from '../interfaces/payment';
import { supplierSchema } from "../schemas/supplier";

const Supplier = model<SupplierId>('Supplier', supplierSchema)

export class SupplierModel {
  static create = async ({ input }: { input: ISupplier }): Promise<SupplierId> => {
    const { idProscai, name } = input
    let supplier = await Supplier.findOne({ idProscai })

    if (supplier === null || supplier === undefined) {
      let newSupplier = await Supplier.create({ name, idProscai })
      return newSupplier
    }
    

    return supplier
  }

  static find = async ({ input }: { input?: {  idProscai: string } }): Promise<SupplierId[]> => {
    const supplier = await Supplier.find({...input})

    return supplier
  }

  static getAll = async (): Promise<SupplierId[]> => {

    let suppliers = await Supplier.find()

    return suppliers
  }

  static deleteAll = async (): Promise<void> => {
    await Supplier.deleteMany({})
  }
}